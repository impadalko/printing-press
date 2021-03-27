export enum HTMLTag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
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
