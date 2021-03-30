export enum HTMLTag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  HR = 'hr',
  P = 'p',
  Code = 'code',
  None = 'none',
}

export class HTMLItem {
  type: HTMLTag = HTMLTag.None

  getParsed(): string {
    throw new Error('Cannot call getParsed() of HTMLItem. Did you forget to override this method?')
  }
}
