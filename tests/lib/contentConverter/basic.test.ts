import { convert } from '../../../src/lib/contentConverter'

test('Converts empty lines to empty strings', () => {
  let result = convert([])
  expect(result).toBe('')
  result = convert([''])
  expect(result).toBe('')
  result = convert(['', '', ''])
  expect(result).toBe('')
})

test('Converts regular lines to HTML paragraphs', () => {
  let result = convert(['abc'])
  expect(result).toBe('<p>abc</p>\n')
  result = convert(['abc', 'cba'])
  expect(result).toBe('<p>abc cba</p>\n')
  result = convert(['abc', '', 'cba'])
  expect(result).toBe('<p>abc</p>\n<p>cba</p>\n')
  result = convert(['abc\\', 'cba'])
  expect(result).toBe('<p>abc<br> cba</p>\n')
  result = convert(['#abc'])
  expect(result).toBe('<p>#abc</p>\n')
})

test('Converts markdown headings to HTML headings', () => {
  let result = convert(['# abc'])
  expect(result).toBe('<h1>abc</h1>\n')
  result = convert(['## abc'])
  expect(result).toBe('<h2>abc</h2>\n')
  result = convert(['### abc'])
  expect(result).toBe('<h3>abc</h3>\n')
  result = convert(['#### abc'])
  expect(result).toBe('<h4>abc</h4>\n')
  result = convert(['##### abc'])
  expect(result).toBe('<h5>abc</h5>\n')
  result = convert(['###### abc'])
  expect(result).toBe('<h6>abc</h6>\n')
  result = convert(['# abc', '# cba'])
  expect(result).toBe('<h1>abc</h1>\n<h1>cba</h1>\n')
  result = convert(['# abc', '', '# cba'])
  expect(result).toBe('<h1>abc</h1>\n<h1>cba</h1>\n')
})

test('Converts triple dash to HTML horizontal rule', () => {
  const result = convert(['---'])
  expect(result).toBe('<hr>\n')
})

test('Converts blocks of code to HTML code + pre tags', () => {
  let result = convert(['```'])
  expect(result).toBe('<pre><code></code></pre>\n')
  result = convert(['```', '```'])
  expect(result).toBe('<pre><code></code></pre>\n')
  result = convert(['```', 'abc', '```'])
  expect(result).toBe('<pre><code>abc\n</code></pre>\n')
  result = convert(['```', 'abc', ' cba', '```'])
  expect(result).toBe('<pre><code>abc\n cba\n</code></pre>\n')
  result = convert(['```', 'abc', '', 'cba', '```'])
  expect(result).toBe('<pre><code>abc\n\ncba\n</code></pre>\n')
  result = convert(['```', 'abc', '>', 'cba', '```'])
  expect(result).toBe('<pre><code>abc\n>\ncba\n</code></pre>\n')
})

test('Converts quotes to HTML blockquote tags', () => {
  let result = convert(['>'])
  expect(result).toBe('<blockquote></blockquote>\n')
  result = convert(['> a'])
  expect(result).toBe('<blockquote><p>a</p></blockquote>\n')
  result = convert(['> a', '> b'])
  expect(result).toBe('<blockquote><p>a b</p></blockquote>\n')
  result = convert(['> a', '> > b', '> c'])
  expect(result).toBe(
    '<blockquote><p>a</p>\n<blockquote><p>b</p></blockquote>\n<p>c</p></blockquote>\n'
  )
  result = convert(['> a', '', '> b'])
  expect(result).toBe('<blockquote><p>a</p></blockquote>\n<blockquote><p>b</p></blockquote>\n')
})
