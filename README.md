# Is it Cloudy? :D

![main-logo](/logo/logo.png) <br><br>

[![build status](https://img.shields.io/travis/com/Friscas/iscloudy.svg)](https://travis-ci.com/Friscas/iscloudy)
[![code coverage](https://img.shields.io/codecov/c/github/Friscas/iscloudy.svg)](https://codecov.io/gh/Friscas/iscloudy)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/Friscas/iscloudy.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/iscloudy.svg)](https://npm.im/iscloudy)

> A simple library to check if your target(s) are behind cloudflare

# Table of Contents

- [General](#general)
- [Install](#install)
- [Usage](#usage)
- [API Docs](#api-docs)
  - [Methods](#methods)
  - [Events](#events)
- [Contributing](#contributing)

# General

With this library you can check if your targets are using behind cloudflare or not.
You could use this library for example to write your own tool for information gathering
and it simplify your life 😉

# Install

[npm][]:

```sh
npm install iscloudy
```

[yarn][]:

```sh
yarn add iscloudy
```

# Usage

```js
const Cloudy = require('iscloudy');

const cloudflare = new Cloudy(
  [
    '188.114.96.7',
    'api.linkino.me',
    'https://admin.linkino.me/',
    'https://linkino.me/'
  ],
  false
);

(async function () {
  const result = await cloudflare.check();
  console.log(result); // will log the array containing objects with target and boolean value of true/false if the target is using cloudflare
})();

cloudflare.onError((err) => {
  console.log(err); // will log error message
});
cloudflare.onCloudFlareFound((data) => {
  console.log('FOUND: ' + data); // will log single object
});
cloudflare.onDone((data) => {
  console.log('FOUND All: ' + data); // will log everything like the anonymous function above
});
```

# API Docs

## Methods

### new IsCloudy(target, update): instance

| Parameter name | Type            | Description                                                                                                   |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| target         | String or Array | a single target or an array of targers containing IPs or domain names                                         |
| update         | Boolean         | if set to true it will fetch the latest ranges of cloudflare ip or else it will use the local saved json file |

### check(): object/array of object

| Return Type                  | Description                                 |
| ---------------------------- | ------------------------------------------- |
| Object or an array of object | It contains Object(s) on format shown below |

```js
{
    target: your target,
    CloudFlare: true/false depending if the target is behind cloudflare
};
```

## Events

### onError(method): void

| Parameter name | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| method         | this event gets fired for any occurring error in the library |

### onCloudFlareFound(method): void

| Return Type | Description                                            |
| ----------- | ------------------------------------------------------ |
| method      | this event gets fired for each found cloudflare target |

### onDone(method): void

| Return Type | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| method      | this event gets fired only once, when the all the targets have being checked |

# Contributing

This is your typical "fork-and-pull" Git workflow.

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes

_NOTE: Be sure to merge the latest from "upstream" before making a pull request!_

# License (MIT)

Copyright (c) 2022 Firas Jelassi <firasroudi@gmail.com>

##

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/

```

```
