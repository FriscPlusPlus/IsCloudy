![main-logo](/logo/logo.png) <br><br>

![build status](https://circleci.com/gh/Friscas/IsCloudy.svg?style=shield)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/Friscas/iscloudy.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/iscloudy.svg)](https://npm.im/iscloudy)

> A simple library to check if your target(s) are cloudflare IPs

# Table of Contents

- [General](#general)
- [Install](#install)
- [Usage](#usage)
- [API Docs](#api-docs)
  - [Methods](#methods)
  - [Events](#events)
- [Contributing](#contributing)

# General
With this library, you can check if your targets are Cloudflare IPs. Why did I make it? The reason is that I am building a CLI tool named [gimmesites](https://github.com/Friscas/gimmesites) that requires checking if a given IP is Cloudflare to report it to the user, and since I could not find any library that does this, I then did it.

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
  console.log(result); // will log an array of objects
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
| target         | String[] |  List of targets, they can be IPs or domain names                                         |
| update         | Boolean         | if set to true it will fetch the latest ranges of Cloudflare IPs. *Default value is false.* |

### check(): void

This is the main method to call, it will not return anything. **USE THE EVENTS TO GET THE RESULTS**

## Events

The methods that you define will need one parameter, to get the returning values. In case of success 'onCloudFlareFound' and 'onDone' you will get for the first event an object and for the latter, you will get an array of objects.

### onError(method): void

| Parameter name | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| method         | this event gets fired for any occurring error in the library |

### onCloudFlareFound(method): void

| Parameter name| Description                                            |
| ----------- | ------------------------------------------------------ |
| method      | this event gets fired for each found cloudflare target. |

### onDone(method): void

| Parameter name | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| method      | this event gets fired only once, when all the targets have being checked. |

# Contributing

This is your typical "fork-and-pull" Git workflow.

- Fork the repo on GitHub
- Clone the project to your machine
- Commit changes to your branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes

_NOTE: Be sure to merge the latest from "upstream" before making a pull request!_

# License (MIT)

Copyright (c) 2022 Firas Jelassi <firasroudi@gmail.com>

##

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
