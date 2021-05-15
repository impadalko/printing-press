import { promises as fs } from 'fs'
import path from 'path'

import { buildContent } from '../../src/api'
import { walk } from '../../src/lib/fsHelper'

const removeExt = (file: string): string => {
  return file.replace(/\.[^.]+$/, '')
}

const templatePath = `${__dirname}/templates`
const contentPath = `${__dirname}/content`
const outputPath = `${__dirname}/output`
const defaultTemplate = 'default.html'

afterEach(() => {
  return fs.rm(outputPath, { recursive: true, force: true })
})

test('Built files have the same file structure as the content files', async () => {
  await buildContent(templatePath, contentPath, outputPath, defaultTemplate)

  const inputFiles = new Set(
    (await walk(`${__dirname}/content`)).map(removeExt).map((e) => path.relative(contentPath, e))
  )
  const outputFiles = new Set(
    (await walk(`${__dirname}/output`)).map(removeExt).map((e) => path.relative(outputPath, e))
  )
  expect(inputFiles).toEqual(outputFiles)
})

test('Built files have the correct content', async () => {
  await buildContent(templatePath, contentPath, outputPath, defaultTemplate)

  const outputFiles = await walk(`${__dirname}/output`)
  for (const output of outputFiles) {
    const content = await fs.readFile(output, { encoding: 'utf-8' })
    expect(content).toMatchSnapshot()
  }
})
