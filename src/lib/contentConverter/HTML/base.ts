export enum HTMLTag {
  Code = 'code',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  HR = 'hr',
  P = 'p',
  Quote = 'blockquote',
  OL = 'ol',
  UL = 'ul',
  LI = 'li',
  None = 'none',
}

export interface HTMLItem {
  type: HTMLTag
  getParsed: () => string
}

export type OptionalHTMLItem = HTMLItem | null
