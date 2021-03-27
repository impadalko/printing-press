import * as HTML from './HTML'

type OptionalHTMLItem = HTML.HTMLItem | null

const getNextHTMLItem = (current: OptionalHTMLItem, line: string): OptionalHTMLItem => {
  if (line === '') return null
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
