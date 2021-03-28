import { HTMLTag, HTMLItem } from './base'
import { format } from './formatter'

class Heading implements HTMLItem {
  type = HTMLTag.None
  content = ''

  getParsed(): string {
    return `<${this.type}>${this.content}</${this.type}>`
  }
}

export class H1 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^# /, ''))
    this.type = HTMLTag.H1
  }
}

export class H2 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^## /, ''))
    this.type = HTMLTag.H2
  }
}

export class H3 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^### /, ''))
    this.type = HTMLTag.H3
  }
}

export class H4 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^#### /, ''))
    this.type = HTMLTag.H4
  }
}

export class H5 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^##### /, ''))
    this.type = HTMLTag.H5
  }
}

export class H6 extends Heading {
  constructor(line: string) {
    super()
    this.content = format(line.replace(/^###### /, ''))
    this.type = HTMLTag.H6
  }
}
