# Create gem app

## Install

```
npm i -g create-gem-app
```

## Usage

```
Usage: create-gem-app [options] <name>

Options:
  -v, --version          output the version number
  -t, --template <name>  specify template
  -h, --help             output usage information

Template:
  gem:            Default. web gem app
  lib:            web gem library
  wasm:           web gem library with wasm
  react:          web react app
  game2d:         web 2d game
  game3d:         web 3d game
  webextension:   web extension
  electron:       electron app
  flutter:        flutter app
  node:           node library
  cli:            node command line app
  express:        node express app
  neon:           node rust native modules
  vscode:         vscode extension
```

## Think

Need a library similar to [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts), used to manage dependencies and configure.

- tsconfig.json
- webpack.config.js
- jest.config.js
- karma.conf.js
- web-ext.config.js
- .prettierrc.js
- .eslintrc.js
- .gitignore

