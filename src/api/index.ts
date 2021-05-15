import { promises as fs } from 'fs'
import path from 'path'

import { parseFile } from '../lib/parser'
import { convert } from '../lib/contentConverter'
import { walk, ensureDir, exists } from '../lib/fsHelper'

export const buildContent = async (
  templatePath: string,
  contentPath: string,
  outputPath: string,
  defaultTemplate?: string
): Promise<void> => {
  const contentFiles = await walk(contentPath)
  const loadedTemplates: { [key: string]: string } = {}
  const delimiterRegex = /<%= ([^%>]*) %>/g

  await Promise.all(
    contentFiles.map(async (file) => {
      const parsedFile = await parseFile(file)

      const template = parsedFile.header?.template || defaultTemplate
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
