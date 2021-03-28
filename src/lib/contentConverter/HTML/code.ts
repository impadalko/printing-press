import { HTMLTag, HTMLItem } from './base'

export class Code implements HTMLItem {
  type = HTMLTag.Code
  content = ''

  extend(line: string): void {
    this.content += line + '\n'
  }

  getParsed(): string {
    return `<pre><${this.type}>${this.content}</${this.type}></pre>`
  }
}
