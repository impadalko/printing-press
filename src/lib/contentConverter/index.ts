import * as HTML from './HTML'
import { ParsedLine } from './parsedLine'

const parseListItem = (line: string) => {
  if (line.match(/^\s*-\s/)) return new HTML.UL(line)
  return new HTML.OL(line)
}

const getNextHTMLItem = (
  lines: string[],
  index: number,
  quoteDepth = 0
): [HTML.OptionalHTMLItem, number] => {
  if (index >= lines.length) return [null, index]
  let line = new ParsedLine(lines[index])
  if (line.quoteDepth < quoteDepth) return [null, index]
  if (line.quoteDepth > quoteDepth) {
    const quote = new HTML.Quote()
    while (line.quoteDepth > quoteDepth) {
      let subItem: HTML.OptionalHTMLItem
      ;[subItem, index] = getNextHTMLItem(lines, index, quoteDepth + 1)
      quote.extend(subItem)
      line = new ParsedLine(lines[index])
    }
    return [quote, index]
  }
  if (line.content === '') return [null, index + 1]
  if (line.content.startsWith('# ')) return [new HTML.H1(line.content), index + 1]
  if (line.content.startsWith('## ')) return [new HTML.H2(line.content), index + 1]
  if (line.content.startsWith('### ')) return [new HTML.H3(line.content), index + 1]
  if (line.content.startsWith('#### ')) return [new HTML.H4(line.content), index + 1]
  if (line.content.startsWith('##### ')) return [new HTML.H5(line.content), index + 1]
  if (line.content.startsWith('###### ')) return [new HTML.H6(line.content), index + 1]
  if (line.content === '---') return [new HTML.HR(), index + 1]
  if (line.content.startsWith('```')) {
    const code = new HTML.Code(line.content.substr(3))
    line = new ParsedLine(lines[++index], quoteDepth)
    while (index < lines.length && line.content != '```') {
      code.extend(line.content)
      line = new ParsedLine(lines[++index], quoteDepth)
    }
    return [code, index + 1]
  }
  const listRegex = /^\s*(-|\d+\.)\s/
  if (line.content.match(listRegex)) {
    let list = parseListItem(line.content)
    const stack = []
    line = new ParsedLine(lines[++index], quoteDepth)
    while (line.content.match(listRegex)) {
      const nextList = parseListItem(line.content)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      while (stack.length && nextList.depth < list.depth) list = stack.pop()!
      if (list.depth === nextList.depth) {
        if (nextList.type === list.type) list.addItems(nextList)
        else if (stack.length) {
          stack[stack.length - 1].addSubList(nextList)
          list = nextList
        } else return [list, index]
      } else if (nextList.depth > list.depth) {
        list.addSubList(nextList)
        stack.push(list)
        list = nextList
      } else {
        if (nextList.type === list.type) list.addItems(nextList)
        else return [list, index]
      }
      line = new ParsedLine(lines[++index], quoteDepth)
    }
    return stack.length ? [stack[0], index] : [list, index]
  }
  const p = new HTML.P(line.content)
  index++
  while (index < lines.length) {
    // This can become inneficient on badly formatted texts
    const [subItem, nextIndex] = getNextHTMLItem(lines, index, quoteDepth)
    if (subItem instanceof HTML.P) {
      p.extend(subItem)
      index = nextIndex
    } else {
      return [p, index]
    }
  }
  return [p, index]
}

export const convert = (lines: string[]): string => {
  let converted = ''
  let nextHTMLItem: HTML.OptionalHTMLItem = null
  let index = 0
  while (index < lines.length) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[nextHTMLItem, index] = getNextHTMLItem(lines, index)
    if (nextHTMLItem !== null) converted += nextHTMLItem.getParsed() + '\n'
  }
  return converted
}
