import { format } from '../../../../src/lib/contentConverter/HTML/formatter'

test('Format bold, italic and links correctly', () => {
  let result = format('**abc**')
  expect(result).toBe('<bold>abc</bold>')
  result = format('*abc*')
  expect(result).toBe('<em>abc</em>')
  result = format('http://example.com')
  expect(result).toBe('<a href="http://example.com">http://example.com</a>')
  result = format('[Example](http://example.com)')
  expect(result).toBe('<a href="http://example.com">Example</a>')
  result = format('*i1* **b1** **b2** [URL](https://url.com) https://url2.com *i2*')
  expect(result).toBe(
    '<em>i1</em> <bold>b1</bold> <bold>b2</bold> <a href="https://url.com">URL</a> ' +
      '<a href="https://url2.com">https://url2.com</a> <em>i2</em>'
  )
})
