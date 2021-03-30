import { HTMLTag, HTMLItem } from './base'

export class Code extends HTMLItem {
  content: string

  constructor() {
    super()
    this.content = ''
    this.type = HTMLTag.Code
  }

  extend(line: string): void {
    this.content += line + '\n'
  }

  getParsed(): string {
    return `<pre><${this.type}>${this.content}</${this.type}></pre>`
  }
}
