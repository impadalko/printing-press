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
