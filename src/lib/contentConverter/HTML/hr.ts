import { HTMLTag, HTMLItem } from './base'

export class HR implements HTMLItem {
  type = HTMLTag.HR

  getParsed(): string {
    return `<${this.type}>`
  }
}
