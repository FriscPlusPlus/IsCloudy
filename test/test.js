// const test = require('ava');
const Cloudy = require('../index');

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
  cloudflare.onError((err) => {
    debugger;
  });
  cloudflare.onCloudFlareFound((data) => {
    debugger;
  });
  cloudflare.onDone((data) => {
    debugger;
  });
  const result = await cloudflare.check();
  console.log(result);
})();
