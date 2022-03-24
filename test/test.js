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
  const result = await cloudflare.check();
  console.log(result);
})();

cloudflare.onError((err) => {
  console.log(err);
});
cloudflare.onCloudFlareFound((data) => {
  console.log('FOUND: ' + data);
});
cloudflare.onDone((data) => {
  console.log('FOUND All: ' + data);
});
