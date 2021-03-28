import { HTMLTag, HTMLItem } from './base'
import { format } from './formatter'

const parseLine = (line: string) => {
  return format(line.replace(/\\$/, '<br>'))
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
