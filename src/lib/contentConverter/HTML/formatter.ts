import linkifyHtml from 'linkifyjs/html'

export const format = (line: string): string => {
  let match: RegExpExecArray | null = null
  const boldRegex = /\*\*([^**]+)\*\*/g
  while ((match = boldRegex.exec(line))) {
    line = line.replace(match[0], `<bold>${match[1]}</bold>`)
  }
  const italicRegex = /\*([^**]+)\*/g
  while ((match = italicRegex.exec(line))) {
    line = line.replace(match[0], `<em>${match[1]}</em>`)
  }
  const codeRegex = /`([^`]+)`/g
  while ((match = codeRegex.exec(line))) {
    line = line.replace(match[0], `<code>${match[1]}</code>`)
  }
  const linkRegex = /\[(.+)\]\((.+)\)/g
  while ((match = linkRegex.exec(line))) {
    line = line.replace(match[0], `<a href="${match[2]}">${match[1]}</a>`)
  }
  return linkifyHtml(line)
}
