import { HTMLTag, HTMLItem } from './base'

export class H1 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^# /, '')
    this.type = HTMLTag.H1
  }
}

export class H2 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^## /, '')
    this.type = HTMLTag.H2
  }
}

export class H3 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^### /, '')
    this.type = HTMLTag.H3
  }
}

export class H4 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^#### /, '')
    this.type = HTMLTag.H4
  }
}

export class H5 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^##### /, '')
    this.type = HTMLTag.H5
  }
}

export class H6 extends HTMLItem {
  constructor(line: string) {
    super()
    this.content = line.replace(/^###### /, '')
    this.type = HTMLTag.H6
  }
}
