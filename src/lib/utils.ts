import { Template, DEFAULT_BRANCH, DEFAULT_USER } from './templates';

export function getGitUrl(template: Template, useBranch = false) {
  return `https://github.com/${template.user || DEFAULT_USER}/${template.repo}${
    useBranch ? `/tree/${template.branch || DEFAULT_BRANCH}` : ''
  }`;
}

export function getGitCloneCommand(template: Template) {
  return `git clone -b ${template.branch || DEFAULT_BRANCH} ${getGitUrl(template)}`;
}
