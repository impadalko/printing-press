import fs from 'fs'
import readline from 'readline'
import YAML from 'yaml'

export interface ParsedFile {
  title: string;
  template: string;
  content: string[];
}

class ParsingError extends Error {
  constructor(msg: string) {
    super(`Could not parse: ${msg}`)
    Error.captureStackTrace(this, ParsingError)
  }
}

export const parseFile = async (path: string): Promise<ParsedFile> => {
  const fileStream = fs.createReadStream(path)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let readingHeader = false
  let header = ''
  const content = []
  for await (const line of lines) {
    if (line === '+++') {
      if (!readingHeader && header)
        throw new ParsingError('Header being defined more than once')
      readingHeader = !readingHeader
      continue
    }

    if (readingHeader) {
      header += `${line}\n`
    } else {
      content.push(line)
    }
  }
  if (readingHeader)
    throw new ParsingError('Header was never closed')
  try {
    const parsedHeader = YAML.parse(header)
    return {
      title: parsedHeader.title,
      template: parsedHeader.template,
      content: content
    }
  } catch (e) {
    throw new ParsingError('Header is not a valid YAML')
  }
}
