// https://www.cloudflare.com/ips-v4
const axios = require('axios').default;
const EventEmitter = require('events');
const IPCIDR = require('ip-cidr');
const path = require('path');

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
    this.writeArrayToJsonFile(ips);
  }

  writeArrayToJsonFile(ips) {
    fs.writeFile('ips.json', JSON.stringify(ips), 'utf8', (err) => {
      if(err) // do something
    });
  }

  _checkIfExist() {
   return path.existsSync('ips.json');
  }

  check() {
    if (!this._checkIfExist() && this.update) {
      this._getRanges();
    } else {
        this.IPs = 
    }
    return this._isCloudy();
  }

  _isCloudy(){
     return this.IPs.find(ip => ip === this.ip) ? true : false;
  }
}

module.exports = isCloudy;
