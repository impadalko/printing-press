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
  const linesInterface = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const lines = []
  for await (const line of linesInterface)
    lines.push(line)

  let header = ''
  const closedHeader = lines.some((line, index) => {
    if(index === 0 && line !== headerDelimiter)
      throw new ParsingError('First line must be a header delimiter')
    if(index !== 0 && line === headerDelimiter)
      return true
    if(line !== headerDelimiter){
      header += `${line}\n`
      return false
    }
  })

  if(!closedHeader)
    throw new ParsingError('Header was never closed')

  let parsedHeader = null
  try {
    parsedHeader = YAML.parse(header)
  } catch (e) {
    throw new ParsingError('Header is not a valid YAML')
  }

  let delimiterCount = 0
  const content: string[] = []
  lines.forEach((line) => {
    if (delimiterCount < 2){
      if (line === headerDelimiter)
        delimiterCount++
    }
    else
      content.push(line)
  })

  return {
    header: parsedHeader,
    content: content
  }
}
