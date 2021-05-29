import { promises as fs } from 'fs'
import path from 'path'

import { exists, walk, ensureDir } from '../../../src/lib/fsHelper'

test('exists returns true when file exists', () => {
  return exists(`${__dirname}/testFiles/index.txt`).then((data) => {
    expect(data).toBe(true)
  })
})

test('exists returns false when file does not exist', () => {
  return exists(`${__dirname}/testFiles/notIndex.txt`).then((data) => {
    expect(data).toBe(false)
  })
})

test('walk returns all files in a directory recursively', () => {
  const basePath = `${__dirname}/testFiles`
  return walk(basePath).then((data) => {
    const relativePaths = data.map((e) => path.relative(basePath, e))
    expect(relativePaths).toMatchSnapshot()
  })
})

test('walk returns empty array on non-existent folder', () => {
  const basePath = `${__dirname}/nonExistentFolder`
  return walk(basePath).then((data) => {
    expect(data).toEqual([])
  })
})

describe('ensureDir', () => {
  const topDir = `${__dirname}/testFiles/ensureDir`

  afterEach(() => {
    return fs.rm(topDir, { recursive: true, force: true })
  })

  test('ensureDir creates a directory recursively', () => {
    const bottomDir = path.join(topDir, 'a/b/c/')
    const file = path.join(bottomDir, 'index.txt')
    return ensureDir(file).then(() => {
      exists(bottomDir).then((data) => {
        expect(data).toBe(true)
      })
    })
  })
})
