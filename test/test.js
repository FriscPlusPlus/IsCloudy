// const test = require('ava');
const Cloudy = require('../index');

const cloudflare = new Cloudy('104.21.68.253', false);

console.log(cloudflare.check());
