import { promises as fs } from 'fs'
import path from 'path'

import api from '../../src/api'
import { walk } from '../../src/lib/fsHelper'

const removeExt = (file: string): string => {
  return file.replace(/\.[^.]+$/, '')
}

const templatePath = `${__dirname}/templates`
const contentPath = `${__dirname}/content`
const outputPath = `${__dirname}/output`
const publicPath = `${__dirname}/public`
const defaultTemplate = 'default.html'

afterEach(() => {
  return fs.rm(outputPath, { recursive: true, force: true })
})

test('Built files have the same file structure as the content files', async () => {
  await api.buildContent(templatePath, contentPath, outputPath, { defaultTemplate })

  const inputFiles = new Set(
    (await walk(contentPath)).map(removeExt).map((e) => path.relative(contentPath, e))
  )
  const outputFiles = new Set(
    (await walk(outputPath)).map(removeExt).map((e) => path.relative(outputPath, e))
  )
  expect(inputFiles).toEqual(outputFiles)
})

test('Built files have the correct content', async () => {
  await api.buildContent(templatePath, contentPath, outputPath, { defaultTemplate })

  const outputFiles = await walk(outputPath)
  for (const output of outputFiles) {
    const content = await fs.readFile(output, { encoding: 'utf-8' })
    expect(content).toMatchSnapshot()
  }
})

test('Public folder files are copied to the output folder', async () => {
  await api.build(templatePath, contentPath, outputPath, publicPath)

  const outputFiles = new Set((await walk(outputPath)).map((e) => path.relative(outputPath, e)))
  const publicFiles = (await walk(publicPath)).map((e) => path.relative(publicPath, e))
  for (const publicFile of publicFiles) {
    expect(outputFiles.has(publicFile)).toBe(true)
  }
})
