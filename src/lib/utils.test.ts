import { Template } from './templates';
import { getGitCloneCommand, getGitUrl } from './utils';

const template: Template = { repo: 'gem-lib-boilerplate', branch: 'game2d' };

test('game2d clone command', () => {
  expect(getGitCloneCommand(template)).toBe('git clone -b game2d https://github.com/mantou132/gem-lib-boilerplate');
});

test('game2d url', () => {
  expect(getGitUrl(template, true)).toBe('https://github.com/mantou132/gem-lib-boilerplate/tree/game2d');
});
