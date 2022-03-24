// const test = require('ava');
const Cloudy = require('../index');

const cloudflare = new Cloudy('104.21.68.253', false);

(async function () {
  const result = await cloudflare.check();
  console.log(result);
})();
