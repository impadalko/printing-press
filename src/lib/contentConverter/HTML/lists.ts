import { HTMLTag, HTMLItem } from './base'

class ListItem implements HTMLItem {
  type = HTMLTag.LI
  content: string
  children: List[] = []

  constructor(content: string) {
    this.content = content
  }

  extend(list: List): void {
    this.children.push(list)
  }

  getParsed(): string {
    const parsedChildren = this.children.map((child) => child.getParsed()).join('\n')
    return parsedChildren
      ? `<${this.type}>\n${this.content}\n${parsedChildren}\n</${this.type}>`
      : `<${this.type}>${this.content}</${this.type}>`
  }
}

class List implements HTMLItem {
  type = HTMLTag.None
  children: ListItem[] = []
  depth: number

  constructor(content: string) {
    this.depth = Math.trunc(content.search(/\S/) / 2)
    this.children.push(new ListItem(content.replace(/^\s*(-|\d+\.)\s/, '')))
  }

  addSubList(list: List) {
    this.children[this.children.length - 1].extend(list)
  }

  // Normally, this will be a list with only one child, but should work with list with different
  // sizes and structures
  addItems(list: List): void {
    this.children = this.children.concat(list.children)
  }

  getParsed(): string {
    const parsedChildren = this.children.map((child) => child.getParsed()).join('\n')
    return `<${this.type}>\n${parsedChildren}\n</${this.type}>`
  }
}

export class OL extends List {
  type = HTMLTag.OL
}

export class UL extends List {
  type = HTMLTag.UL
}
