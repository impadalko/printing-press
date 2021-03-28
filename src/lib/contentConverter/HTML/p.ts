import { HTMLTag, HTMLItem } from './base'
import { format } from './formatter'

const parseLine = (line: string) => {
  return format(line.replace(/\\$/, '<br>'))
}

export class P implements HTMLItem {
  type = HTMLTag.P
  content: string

  constructor(line: string) {
    this.content = parseLine(line)
  }

  extend(p: P): void {
    this.content += ' ' + p.content
  }

  getParsed(): string {
    return `<${this.type}>${this.content}</${this.type}>`
  }
}
