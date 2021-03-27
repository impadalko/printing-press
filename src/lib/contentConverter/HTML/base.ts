export enum HTMLTag {
  P = 'p',
  None = 'none',
}

export class HTMLItem {
  content = ''
  type: HTMLTag = HTMLTag.None

  getParsed(): string {
    return this.type !== HTMLTag.None ? `<${this.type}>${this.content}</${this.type}>` : ''
  }
}
