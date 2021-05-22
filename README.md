# Printing Press

Printing press is a static site generator (SSG) built in Typescript. Write your content in Markdown
and your templates in a ejs-like syntax.

## Why should I use this instead of others SSGs?

Honestly, you shouldn't: this project was made mostly because I thought that building my own SSG
would be an interesting side project, which means that this project may not contain all features
you would like to use and not be as stable as other projects. If you want to write content in
Markdown, I'd recommend using [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/).
If you want a more generic approach, I'd recommend [Next.js](https://nextjs.org/) or
[Gatsby](https://www.gatsbyjs.com/).

This project is intended to those that:

- Have a technical background on web development
- Want to be able to integrate their SSG with other JS tooling
- Think that dependencies are to be avoided when possible
- Want to write content in Markdown and fully customize the templates

## Installing

This project can installed either by npm/yarn (recommended) or by directly building it.

### NPM Package (recommended)

To install using yarn:

```
yarn add printing-press --dev
```

To instal using npm

```
npm install printing-press -D
```

### Building

If you don't want to use the npm package, you can build the project by running:

```
git clone https://github.com/impadalko/printing-press.git
cd printing-press
yarn install
yarn build
yarn link
```

This will make the command `printing-press` available at your command line.

## Writing your site

An example of a built site can be seen [here](example/). This project requires both content files
and template files. This project also support a public folder (also known as a static folder).

### Content Files

The content files are composed by two parts: the header and the content itself.

#### Header

A header is defined by a structure like:

```
+++
key1: value1
key2: value2
...
+++
```

Most keys are arbitrary strings you define and that can be then used in your templates. Some special
keys are:

- template: Defines which template will be used for building this file (relative to the template folder root)

Note that **the header is required** even if no keys are defined.

#### Content

After the header, everything will be treated as your content in Markdown and it will be translated
to the final HTML.

#### File structure

The file structure of your content folder will be the same of the output folder. For example, a
content folder with the following structure:

```
└── content/
    ├── index.md
    └── blog/
        ├── index.md
        └── about.md
```

would generate an output folder with the following structure:

```
└── output/
    ├── index.html
    └── blog/
        ├── index.html
        └── about.html
```

### Template files

The template files follow an ejs-like syntax (but without code execution). The build method will
search for patterns like `<%= string %>` and replace them for either the value in the header with
the key equal the specified `string` (if existent). If the specified `string` is equal `content`,
the build process will replace it will be the compiled markdown.

### Public Folder

The public folder (also known as static folder) contains files that will be copied as they are to
the output folder: useful for things like images, css etc.

## Building your site

### CLI

A CLI is available by running:

```
yarn run printing-press
```

or

```
npx printing-press
```

The required arguments are:

- `--template/-t`: Path to your template files.
- `--content/-c`: Path to your content files.
- `--output/-o`: Path to save the output of the building process.

The optional arguments are:

- `--public/-p`: Path to your public folder
- `--default-template/-d`: Default template to use when there is no template specified by the content file

All available options can be seem by using the `--help/-h` option.

### API

A Node.js API is available and a basic documentation can be acessed at https://impadalko.github.io/printing-press/
