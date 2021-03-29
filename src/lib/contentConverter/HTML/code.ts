import { HTMLTag, HTMLItem } from './base'

export class Code extends HTMLItem {
  children: string[]

  constructor() {
    super()
    this.type = HTMLTag.Code
    this.children = []
  }

  extend(line: string): void {
    this.children.push(line)
  }

  getParsed(): string {
    return `<pre><${this.type}>${this.children.join('\n')}</${this.type}></pre>`
  }
}
