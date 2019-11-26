export const DEFAULT_USER = 'mantou132';
export const DEFAULT_BRANCH = 'master';

export interface Template {
  user?: string;
  branch?: string;
  comment?: string;
  repo: string;
}

export default {
  gem: { repo: 'gem-boilerplate', comment: 'Default. web gem app' },
  lib: { repo: 'gem-lib-boilerplate', comment: 'web gem library' },
  react: { repo: 'react-boilerplate', comment: 'web react app' },
  game2d: { repo: 'gem-lib-boilerplate', branch: 'game2d', comment: 'web 2d game' },
  game3d: { repo: 'gem-lib-boilerplate', branch: 'game3d', comment: 'web 3d game' },
  webextension: { repo: 'webextension-boilerplate', comment: 'web extension' },
  electron: { repo: 'electron-boilerplate', comment: 'electron app' },
  flutter: { repo: 'flutter_boilerplate', comment: 'flutter app' },
  node: { repo: 'node-boilerplate', comment: 'node library' },
  cli: { repo: 'node-boilerplate', branch: 'cli', comment: 'node command line app' },
  express: { repo: 'node-boilerplate', branch: 'express', comment: 'node express app' },
  neon: { repo: 'node-boilerplate', branch: 'neon', comment: 'node rust native modules' },
  vscode: { repo: 'node-boilerplate', branch: 'vscode', comment: 'vscode extension' },
} as { [key: string]: Template };
