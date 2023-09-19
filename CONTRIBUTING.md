# Contributing to the Data Recorder

## Development

We use [pre-commit](https://pre-commit.com/) hooks.

See the _Development Environment_ section of the [Technical Documentation](docs/technical/README.md) for guidance on setting-up a development environment.

## Merge Request Reviews

We use scoped labels to track the state of a merge request in the review process.

_Responsibility_ means 'the person that is responsible for setting this label'

### MR::WIP

Work in progress - don't review yet.

Responsibility: Author

### MR::Review

The MR is ready for initial code review, or fixes have been made to the MR after review.

Responsibility: Author

### MR::Changes Requested

The reviewer has read over the MR, and has indicated that there are parts that need fixing up.

Responsibility: Reviewer

### MR::Ready for Merge

The reviewer has read over the MR, and has approved the MR for merge.

Responsibility: Reviewer

In general, it is the **authors responsibility to merge the commit when the pipeline passes and they are happy with it.**

In Summary:

![](review-workflow.png)

## Git Standards

We use a fetch/rebase workflow along with the usual [Gitlab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html).

## Commit Message Standards

We follow a modified [Angular Commit Message](https://github.com/angular/angular/blob/master/CONTRIBUTING.md) standard of:

> type(scope): message

The commit message is enforced by CI.

### Type

Must be one of the following:

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests
- chore: common, house-cleaning things (updating version numbers, cleaning packages etc)

### Scope

In angular this is usually the npm package affected, but for our project the scope refers to which part of the project is affected.
We base the scope from epic names, and this is enforced by pre-commit:

- requirements
- software

### Other bits

Gitlint enforces a length limit of 100 characters on commit messages.
This makes it easier to read the message in `git log`, the GitLab web interface and git GUI software.
