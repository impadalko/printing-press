export class ParsedLine {
  content = ''
  quoteDepth = 0

  constructor(line: string, maxDepth = Infinity) {
    if (line === undefined) return
    this.content = line
    this.quoteDepth = 0
    while (this.content.startsWith('>') && this.quoteDepth < maxDepth) {
      this.content = this.content.replace(/>\s?/, '')
      this.quoteDepth++
    }
  }
}
