import { convert } from '../../../src/lib/contentConverter'

test('Convert mixed paragraphs and headings correctly', () => {
  let result = convert(['# abc', 'cba'])
  expect(result).toBe('<h1>abc</h1>\n<p>cba</p>\n')
  result = convert(['# abc', '## cba'])
  expect(result).toBe('<h1>abc</h1>\n<h2>cba</h2>\n')
  result = convert(['abc', '# cba'])
  expect(result).toBe('<p>abc</p>\n<h1>cba</h1>\n')
  result = convert(['abc', 'cba', '# def'])
  expect(result).toBe('<p>abc cba</p>\n<h1>def</h1>\n')
  result = convert(['abc', '# cba', 'def'])
  expect(result).toBe('<p>abc</p>\n<h1>cba</h1>\n<p>def</p>\n')
  result = convert(['abc', '', 'cba', '# def'])
  expect(result).toBe('<p>abc</p>\n<p>cba</p>\n<h1>def</h1>\n')
})
