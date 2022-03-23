// https://www.cloudflare.com/ips-v4
const axios = require('axios').default;
const EventEmitter = require('events');
const IPCIDR = require('ip-cidr');

class isCloudy {
  constructor(host, update) {
    this.ip = host;
    this.update = update || false;
    this.IPs = [];
  }

  _getRanges() {
    axios({
      method: 'GET',
      url: 'https://www.cloudflare.com/ips-v4',
    })
      .then((data) => {
        const ranges = data.data.split('\n');
        this._generateIPs(ranges);
      })
      .catch((error) => {
        debugger;
      });
  }
  _generateIPs(ranges) {
    for (let range of ranges) {
      let ips = new IPCIDR(range).toArray();
      this.IPs = [...this.IPs, ...ips];
    }
  }
  check() {
    if (this.update) {
      this._getRanges();
    }
  }
}

module.exports = isCloudy;
