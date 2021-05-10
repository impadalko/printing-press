export const format = (line: string): string => {
  let match: RegExpExecArray | null = null
  const boldRegex = /\*\*([^**]+)\*\*/g
  while ((match = boldRegex.exec(line))) {
    line = line.replace(match[0], `<bold>${match[1]}</bold>`)
  }
  const italicRegex = /\*([^*]+)\*/g
  while ((match = italicRegex.exec(line))) {
    line = line.replace(match[0], `<em>${match[1]}</em>`)
  }
  const strikedRegex = /~~([^~~]+)~~/g
  while ((match = strikedRegex.exec(line))) {
    line = line.replace(match[0], `<s>${match[1]}</s>`)
  }
  const codeRegex = /`([^`]+)`/g
  while ((match = codeRegex.exec(line))) {
    line = line.replace(match[0], `<code>${match[1]}</code>`)
  }
  const imageRegex = /!\[([^[\]]+)\]\(([^()]+)\)/g
  while ((match = imageRegex.exec(line))) {
    line = line.replace(match[0], `<img alt="${match[1]}" src="${match[2]}">`)
  }
  const linkRegex = /\[([^[\]]+)\]\(([^()]+)\)/g
  while ((match = linkRegex.exec(line))) {
    line = line.replace(match[0], `<a href="${match[2]}">${match[1]}</a>`)
  }
  return line
}
