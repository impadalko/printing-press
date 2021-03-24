import fs from 'fs'
import readline from 'readline'
import YAML from 'yaml'

export interface ParsedFile {
  header: unknown;
  content: string[];
}

class ParsingError extends Error {
  constructor(msg: string) {
    super(`Could not parse: ${msg}`)
    Error.captureStackTrace(this, ParsingError)
  }
}

export const parseFile = async (path: string, headerDelimiter = '+++'): Promise<ParsedFile> => {
  const fileStream = fs.createReadStream(path)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let delimiterCount = 0
  let header = ''
  const content: string[] = []
  for await (const line of lines) {
    if (delimiterCount === 0 && line !== headerDelimiter)
      throw new ParsingError('First line must be a header delimiter')
    if (delimiterCount < 2){
      if (line === headerDelimiter)
        delimiterCount++
      else
        header += `${line}\n`
      continue
    }
    content.push(line)
  }

  if(delimiterCount === 1)
    throw new ParsingError('Header was never closed')

  try {
    const parsedHeader = YAML.parse(header)
    return {
      header: parsedHeader,
      content: content
    }
  } catch (e) {
    throw new ParsingError('Header is not a valid YAML')
  }
}
