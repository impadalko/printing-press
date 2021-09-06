import api from '../api'

import { promises as fs } from 'fs'

const main = async () => {
  const configFile = await fs.readFile('.printingpressrc', { encoding: 'utf8' })
  const {
    template,
    content,
    output,
    public: publicFolder,
    defaultTemplate,
  } = JSON.parse(configFile)

  return api.build(template, content, output, publicFolder, { defaultTemplate })
}

console.log('Starting build process')
main()
  .then(() => {
    console.log('Finished build process')
    process.exit(0)
  })
  .catch((e) => {
    console.error(`Something went wrong: ${e}`)
    process.exit(1)
  })
