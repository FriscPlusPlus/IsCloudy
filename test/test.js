const Cloudy = require('../index');

const cloudflare = new Cloudy(
  [
    '188.114.96.7',
    'sofialeser.com'
  ],
  true
);

cloudflare.onDone((msg) => {
  console.log(msg);
});

(async function () {
  await cloudflare.check();
})();
