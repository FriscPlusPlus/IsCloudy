const Cloudy = require('../index');
const cloudflare = new Cloudy('1.1.1.1', true);

cloudflare.check();
