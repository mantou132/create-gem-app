#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import shell from 'shelljs';
import program from 'commander';
import colors from 'colors';
import lodash from 'lodash';

import templates from './lib/templates';
import { getGitCloneCommand, getGitUrl } from './lib/utils';

process.on('unhandledRejection', (err) => {
  console.error(colors.red(String(err)));
  shell.exit(1);
});

if (!shell.which('git')) {
  console.error(colors.red('Sorry, this script requires git'));
  shell.exit(1);
}

program.version(require(path.resolve(__dirname, '../package.json')).version || '', '-v, --version');

program
  .command('list')
  .description('show all supported templates')
  .action(() => {
    for (const key in templates) {
      console.log(`${colors.green(key)}: \t${templates[key].comment || ''}`);
    }
    shell.exit(0);
  });

let appName = '';
let template = templates.gem;

program
  .arguments('<name>')
  .action((name) => {
    appName = name;
  })
  .option('-t, --template <name>', 'specify template');

program.parse(process.argv);

if (!appName) {
  console.error(colors.red('Error: please input app name'));
  shell.exit(1);
}

if (program.template) {
  if (!(program.template in templates)) {
    console.error(colors.red('Sorry, this template does not exist'));
    shell.exit(1);
  }
  template = templates[program.template as keyof typeof templates];
}

console.log(colors.green(`Use ${getGitUrl(template)}`));

if (shell.exec(`${getGitCloneCommand(template)} ${appName}`).code !== 0) {
  console.error(colors.red('Error: Git clone failed'));
  shell.exit(1);
}

// !!! process.cwd() position
shell.cd(appName);
{
  shell.rm('-rf', '.git');

  if (fs.existsSync(`${process.cwd()}/yarn.lock`)) {
    shell.exec('yarn');
  } else {
    shell.exec('npm i');
  }

  const pkgPath = path.resolve(process.cwd(), template.dir || '', 'package.json');

  const pkg = require(pkgPath);

  const data = Object.assign(pkg, {
    name: lodash.kebabCase(appName),
    description: '',
    repository: undefined,
    bugs: undefined,
    homepage: undefined,
    keywords: undefined,
    author: shell.exec('git config user.name', { silent: true }).stdout.trim(),
  });
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  shell.exec('git init');
  shell.exec('git add .');
  shell.exec('git commit -a -m "init"');

  console.log(colors.green(`Complete!`));
  console.log(colors.green(`Project location: ${path.resolve(appName)}`));
  console.log(colors.green(`Complete!, Use \`code ${appName}\` start development`));
}
