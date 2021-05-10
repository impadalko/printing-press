import { parseFile } from '../../../src/lib/parser'

test('Parses correctly formatted file with non-empty header', () => {
  return parseFile(`${__dirname}/correctFile.md`).then((data) => {
    expect(data).toEqual({
      header: {
        title: 'Correct file',
        template: 'example',
      },
      content: ['', 'Amazing example!'],
    })
  })
})

test('Parses correctly formatted file with empty header', () => {
  return parseFile(`${__dirname}/emptyHeader.md`).then((data) => {
    expect(data).toEqual({
      header: null,
      content: ['', 'Amazing example!'],
    })
  })
})

test('Throws error on file with open header', () => {
  return parseFile(`${__dirname}/openHeader.md`).catch((error) => {
    expect(error.message).toMatch('Header was never closed')
  })
})

test('Thows error on file with invalid header', () => {
  return parseFile(`${__dirname}/invalidHeader.md`).catch((error) => {
    expect(error.message).toMatch(/Line ".*" is not valid in header/)
  })
})

test('Thows error on file not opening a header on the first line', () => {
  return parseFile(`${__dirname}/withoutHeader.md`).catch((error) => {
    expect(error.message).toMatch('First line must be a header delimiter')
  })
})
