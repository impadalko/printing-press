import * as HTML from './HTML'

type OptionalHTMLItem = HTML.HTMLItem | null

const getNextHTMLItem = (current: OptionalHTMLItem, line: string): OptionalHTMLItem => {
  if (line === '') return null
  if (line.startsWith('# ')) return new HTML.H1(line)
  if (line.startsWith('## ')) return new HTML.H2(line)
  if (line.startsWith('### ')) return new HTML.H3(line)
  if (line.startsWith('#### ')) return new HTML.H4(line)
  if (line.startsWith('##### ')) return new HTML.H5(line)
  if (line.startsWith('###### ')) return new HTML.H6(line)
  if (line === '---') return new HTML.HR()
  if (current !== null && current instanceof HTML.P) {
    current.extend(line)
    return current
  }
  return new HTML.P(line)
}

export const convert = (lines: string[]): string => {
  let converted = ''
  let currentHTMLItem: OptionalHTMLItem = null
  let nextHTMLItem: OptionalHTMLItem = null
  for (const line of lines) {
    nextHTMLItem = getNextHTMLItem(currentHTMLItem, line)
    if (currentHTMLItem !== nextHTMLItem) {
      if (currentHTMLItem !== null) converted += currentHTMLItem.getParsed() + '\n'
      currentHTMLItem = nextHTMLItem
    }
  }
  if (currentHTMLItem !== null) converted += currentHTMLItem.getParsed() + '\n'
  return converted
}
