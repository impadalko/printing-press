import { promises as fs } from 'fs'
import path from 'path'

import { convert } from '../lib/contentConverter'
import { walk, ensureDir, exists } from '../lib/fsHelper'
import { parseFile } from '../lib/parser'

export interface BuildOptions {
  /** Path to the (optional) default template (relative to template path) */
  defaultTemplate?: string
}

/**
 * Build your website content
 * @param templatePath - Path to template folder
 * @param contentPath - Path to content folder
 * @param outputPath - Path to output folder
 * @param buildOptions - Options for the build process
 */
const buildContent = async (
  templatePath: string,
  contentPath: string,
  outputPath: string,
  buildOptions: BuildOptions = {}
): Promise<void> => {
  const contentFiles = await walk(contentPath)
  const loadedTemplates: { [key: string]: string } = {}
  const delimiterRegex = /<%= ([^%>]*) %>/g

  await Promise.all(
    contentFiles.map(async (file) => {
      const parsedFile = await parseFile(file)

      const template = parsedFile.header?.template || buildOptions.defaultTemplate
      if (!template) return

      if (!loadedTemplates[template]) {
        const templateFilePath = path.join(templatePath, template)
        if (!(await exists(templateFilePath))) {
          console.log(`${file}: Cannot find ${template} in template files`)
          return
        }
        loadedTemplates[template] = await fs.readFile(templateFilePath, { encoding: 'utf-8' })
      }

      let output = loadedTemplates[template]
      let match: RegExpExecArray | null = null
      while ((match = delimiterRegex.exec(loadedTemplates[template]))) {
        if (match[1] === 'content') output = output.replace(match[0], convert(parsedFile.content))
        else if (parsedFile.header?.[match[1]])
          output = output.replace(match[0], parsedFile.header?.[match[1]])
        else console.log(`${file}: Could not find ${match[1]} in header`)
      }

      const outputFilePath = path
        .join(outputPath, path.relative(contentPath, file))
        .replace(/\.[^.]+$/, '.html')
      await ensureDir(outputFilePath)
      await fs.writeFile(outputFilePath, output)
    })
  )
}

/**
 * Build your website
 * @param templatePath - Path to template folder
 * @param contentPath - Path to content folder
 * @param outputPath - Path to output folder
 * @param publicPath - Path to public folder
 * @param buildOptions - Options for the build process
 */
const build = async (
  templatePath: string,
  contentPath: string,
  outputPath: string,
  publicPath?: string,
  buildOptions: BuildOptions = {}
): Promise<void> => {
  await buildContent(templatePath, contentPath, outputPath, buildOptions)

  if (publicPath) {
    const publicFiles = await walk(publicPath)
    await Promise.all(
      publicFiles.map(async (src) => {
        const dest = path.join(outputPath, path.relative(publicPath, src))
        await ensureDir(dest)
        await fs.copyFile(src, dest)
      })
    )
  }
}

export default {
  build,
  buildContent,
}
