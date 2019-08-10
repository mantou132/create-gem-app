#!/usr/bin/env node --experimental-modules --no-warnings

import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

const APP_NAME = process.argv[2];

if (!APP_NAME) {
  shell.echo('Error: please input app name');
  shell.exit(1);
}

if (shell.exec(`git clone https://github.com/mantou132/gem-boilerplate ${APP_NAME}`).code !== 0) {
  shell.echo('Error: Git clone failed');
  shell.exit(1);
}

shell.cd(APP_NAME); // process.cwd()

shell.rm('-rf', '.git');
shell.exec('npm i');

import(`${process.cwd()}/package.json`).then(async ({default: pkg}) => {
  const data = Object.assign(pkg, {
    name: APP_NAME,
    description: '',
    repository: undefined,
    bugs: undefined,
    homepage: undefined,
    keywords: undefined,
    author: shell.exec('git config user.name', { silent: true }).stdout.trim(),
  })
  await fs.promises.writeFile(path.resolve('package.json'), JSON.stringify(data, null, 2))
  shell.echo('Complete!');
}).catch(err => {
  console.log(err)
  throw err
})
