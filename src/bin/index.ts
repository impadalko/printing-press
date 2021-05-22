import yargs from 'yargs'

import api from '../api'

const {
  template,
  content,
  output,
  public: publicFolder,
  'default-template': defaultTemplate,
} = yargs
  .scriptName('printing-press')
  .option('template', {
    description: 'Path to template folder',
    alias: 't',
    type: 'string',
    demandOption: true,
  })
  .option('content', {
    description: 'Path to content folder',
    alias: 'c',
    type: 'string',
    demandOption: true,
  })
  .option('output', {
    description: 'Path to output folder',
    alias: 'o',
    type: 'string',
    demandOption: true,
  })
  .option('public', {
    description: 'Path to public folder: it will be copied as it is to the output folder',
    alias: 'p',
    type: 'string',
  })
  .option('default-template', {
    description:
      'Default template to be used when header does not specify one (this should be the path relative to the template folder)',
    alias: 'd',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv

console.log('Starting build process')
api
  .build(template, content, output, publicFolder, { defaultTemplate })
  .then(() => {
    console.log('Finished build process')
    process.exit(0)
  })
  .catch((e) => {
    console.error(`Something went wrong: ${e}`)
    process.exit(1)
  })
