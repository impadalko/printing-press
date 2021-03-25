import { HTMLTag, HTMLItem } from './base'

export class P extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line
    this.type = HTMLTag.P
  }
}
