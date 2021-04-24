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

test('Convert blocks of code with paragraphs and headings correctly', () => {
  let result = convert(['abc', '```', 'cba', '```'])
  expect(result).toBe('<p>abc</p>\n<pre><code>cba\n</code></pre>\n')
  result = convert(['# abc', '```', 'cba', '```'])
  expect(result).toBe('<h1>abc</h1>\n<pre><code>cba\n</code></pre>\n')
  result = convert(['abc', '```', 'cba', '```', 'def'])
  expect(result).toBe('<p>abc</p>\n<pre><code>cba\n</code></pre>\n<p>def</p>\n')
  result = convert(['abc', '```', 'cba', '```', '# def'])
  expect(result).toBe('<p>abc</p>\n<pre><code>cba\n</code></pre>\n<h1>def</h1>\n')
})

test('Convert quotes with other elements inside correctly', () => {
  let result = convert(['> a', '> ```', '> abc', '> ```'])
  expect(result).toBe('<blockquote><p>a</p>\n<pre><code>abc\n</code></pre></blockquote>\n')
  result = convert(['> ```', '> > abc', '> ```'])
  expect(result).toBe('<blockquote><pre><code>> abc\n</code></pre></blockquote>\n')
  result = convert(['> # abc', '> cba', '> def'])
  expect(result).toBe('<blockquote><h1>abc</h1>\n<p>cba def</p></blockquote>\n')
  result = convert(['> abc', '> cba', '> # def'])
  expect(result).toBe('<blockquote><p>abc cba</p>\n<h1>def</h1></blockquote>\n')
  result = convert(['> abc', '> cba', '> # def'])
  expect(result).toBe('<blockquote><p>abc cba</p>\n<h1>def</h1></blockquote>\n')
  result = convert(['> - abc', '>   - cba', '> - def'])
  expect(result).toBe(
    '<blockquote><ul>\n<li>\nabc\n<ul>\n<li>cba</li>\n</ul>\n</li>\n<li>def</li>\n</ul></blockquote>\n'
  )
})
