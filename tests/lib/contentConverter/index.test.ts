import { convert } from '../../../src/lib/contentConverter'

test('Converts empty lines to an empty string', () => {
  let result = convert([])
  expect(result).toBe('')
  result = convert([''])
  expect(result).toBe('')
  result = convert(['', '', ''])
  expect(result).toBe('')
})

test('Converts regular lines to paragraphs', () => {
  let result = convert(['abc'])
  expect(result).toBe('<p>abc</p>\n')
  result = convert(['abc', 'cba'])
  expect(result).toBe('<p>abc cba</p>\n')
  result = convert(['abc', '', 'cba'])
  expect(result).toBe('<p>abc</p>\n<p>cba</p>\n')
})
