import { HTMLTag, HTMLItem, OptionalHTMLItem } from './base'

export class Quote implements HTMLItem {
  type = HTMLTag.Quote
  children: OptionalHTMLItem[] = []

  extend(item: OptionalHTMLItem): void {
    this.children.push(item)
  }

  getParsed(): string {
    const parsedChildren = this.children
      .filter((child) => child !== null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((child) => child!.getParsed())
      .join('\n')
    return `<${this.type}>${parsedChildren}</${this.type}>`
  }
}
