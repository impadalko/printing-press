import { HTMLTag, HTMLItem } from './base'

// TODO: Add support for links
const parseLine = (line: string) => {
  return line.replace(/\\$/, '<br/>')
}

export class P extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = parseLine(line)
    this.type = HTMLTag.P
  }

  extend(line: string): void {
    this.content += ' ' + parseLine(line)
  }
}
