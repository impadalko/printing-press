import { HTMLTag, HTMLItem } from './base'

export class Code implements HTMLItem {
  type = HTMLTag.Code
  content = ''
  className?: string

  constructor(className?: string) {
    if (className) this.className = className
  }

  extend(line: string): void {
    this.content += line + '\n'
  }

  getParsed(): string {
    return this.className
      ? `<pre><${this.type} class="${this.className}">\n${this.content}</${this.type}></pre>`
      : `<pre><${this.type}>\n${this.content}</${this.type}></pre>`
  }
}
