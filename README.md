# @kenan/npm-cli-login

Fork of [npm-cli-login](https://github.com/postmanlabs/npm-cli-login).

  - Uses [npm-profile](https://github.com/npm/npm-profile) instead of the deprecated npm-registry-client
  - Does not depend on snyk

## Install

```bash
$ npm install @kenan/npm-cli-login
```

## Usage

`npm-cli-login` expects the following environment variables to be set before you
can use it to authenticate:

- `NPM_USER`: npm username
- `NPM_PASS`: npm password
- `NPM_EMAIL`: npm email
- `NPM_REGISTRY`: (optional) Private npm registry to log in to (Default: https://registry.npmjs.org)
- `NPM_SCOPE`: (optional) Private npm scope
- `NPM_RC_PATH`: (optional) Path to a custom .npmrc file you want to update (Default: `~/.npmrc`)

Once the required ones are set, you can just run the following to log in:

```bash
$ npm-cli-login
```

You can also export variables and run it all in one line:

```bash
$ NPM_USER=testUser NPM_PASS=testPass NPM_EMAIL=test@example.com npm-cli-login
```

There is also support for command line arguments:

  - `-u`: npm Username
  - `-p`: npm Password
  - `-e`: npm Email
  - `-r`: npm Registry
  - `-s`: npm Scope
  - `--quotes`: Set to `false` by default. Specifies whether your auth token requires quotes. This might required when your auth token has special characters, like `=`, `?` etc.
  - `--config-path`: Set to `~/.npmrc` by default. Can be used to configure a custom .npmrc file to edit.

For example:

```bash
$ npm-cli-login -u testUser -p testPass -e test@example.com
```

Or:

```bash
$ npm-cli-login -u testUser -p testPass -e test@example.com -r https://private.npm.com -s @private-npm --quotes --config-path="./custom/path/"
```

Do note that at least one of the two ways must be configured, that is, you must
either provide the required fields (username, password and email) using the
environment variables or the command line arguments (or both).

## API

To use the package programmatically, just require the module and pass in your
npm auth details as arguments:

```javascript
const npmLogin = require('@kenan/npm-cli-login');
npmLogin(username, password, email [, registry, scope, quotes, configPath]);
```
