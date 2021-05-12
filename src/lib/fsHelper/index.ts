import { promises as fs } from 'fs'
import path from 'path'

export const walk = async (inputPath: string): Promise<string[]> => {
  const dirContent = await fs.readdir(inputPath, { withFileTypes: true })
  let files: string[] = []
  for (const entry of dirContent) {
    const entryPath = path.join(inputPath, entry.name)
    if (entry.isDirectory()) files = files.concat(await walk(entryPath))
    else files.push(entryPath)
  }
  return files
}

export const ensureDir = async (filePath: string): Promise<void> => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

export const exists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
