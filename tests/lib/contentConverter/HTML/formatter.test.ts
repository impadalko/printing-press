import { format } from '../../../../src/lib/contentConverter/HTML/formatter'

test('Format bold, italic, strikethrough, code and links correctly', () => {
  let result = format('**abc**')
  expect(result).toBe('<bold>abc</bold>')
  result = format('*abc*')
  expect(result).toBe('<em>abc</em>')
  result = format('~~abc~~')
  expect(result).toBe('<s>abc</s>')
  result = format('`abc`')
  expect(result).toBe('<code>abc</code>')
  result = format('http://example.com')
  expect(result).toBe('<a href="http://example.com">http://example.com</a>')
  result = format('[Example](http://example.com)')
  expect(result).toBe('<a href="http://example.com">Example</a>')
  result = format('*i1* **b1** **b2** *i2*')
  expect(result).toBe('<em>i1</em> <bold>b1</bold> <bold>b2</bold> <em>i2</em>')
  result = format(
    '[URL1](https://url1.com) https://url2.com https://url3.com [URL4](https://url4.com)'
  )
  expect(result).toBe(
    '<a href="https://url1.com">URL1</a> <a href="https://url2.com">https://url2.com</a> ' +
      '<a href="https://url3.com">https://url3.com</a> <a href="https://url4.com">URL4</a>'
  )
})
