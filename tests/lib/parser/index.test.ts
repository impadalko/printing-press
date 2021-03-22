import { parseFile } from '../../../src/lib/parser'

test('Parses correctly formatted file', () => {
  return parseFile(`${__dirname}/correctFile.md`).then(data => {
    expect(data).toEqual({title: 'Correct file', template: 'example', content: ['', 'Amazing example!']})
  })
})

test('Throws error on file with multiple headers', () => {
  return parseFile(`${__dirname}/multipleHeaders.md`).catch(error => {
    expect(error.message).toMatch('Header being defined more than once')
  })
})

test('Throws error on file with open header', () => {
  return parseFile(`${__dirname}/openHeader.md`).catch(error => {
    expect(error.message).toMatch('Header was never closed')
  })
})

test('Thows error on file with invalid header', () => {
  return parseFile(`${__dirname}/invalidHeader.md`).catch(error => {
    expect(error.message).toMatch('Header is not a valid YAML')
  })
})
