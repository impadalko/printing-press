import fs from 'fs'
import readline from 'readline'

type Header = { [k: string]: string }

interface ParsedFile {
  header: Header | null
  content: string[]
}

class ParsingError extends Error {
  constructor(msg: string) {
    super(`Could not parse: ${msg}`)
    Error.captureStackTrace(this, ParsingError)
  }
}

const parseHeader = (header: string): Header | null => {
  if (!header) return null
  const lines = header.split('\n')
  const parsedHeader: Header = {}
  lines.forEach((line) => {
    if (!line) return
    const splittedLine = line.split(':')
    if (splittedLine.length !== 2) throw new ParsingError(`Line "${line}" is not valid in header`)
    parsedHeader[splittedLine[0].trim()] = splittedLine[1].trim()
  })
  return parsedHeader
}

export const parseFile = async (path: string, headerDelimiter = '+++'): Promise<ParsedFile> => {
  const fileStream = fs.createReadStream(path)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let delimiterCount = 0
  let header = ''
  const content: string[] = []
  for await (const line of lines) {
    if (delimiterCount === 0 && line !== headerDelimiter)
      throw new ParsingError('First line must be a header delimiter')
    if (delimiterCount < 2) {
      if (line === headerDelimiter) delimiterCount++
      else header += `${line}\n`
      continue
    }
    content.push(line)
  }

  if (delimiterCount === 1) throw new ParsingError('Header was never closed')

  const parsedHeader = parseHeader(header)
  return {
    header: parsedHeader,
    content: content,
  }
}
