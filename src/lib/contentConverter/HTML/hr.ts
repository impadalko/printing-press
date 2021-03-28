import { HTMLTag, HTMLItem } from './base'

export class HR extends HTMLItem {
  constructor() {
    super()
    this.type = HTMLTag.HR
  }

  getParsed(): string {
    return `<${this.type}>`
  }
}
