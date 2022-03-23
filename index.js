/*
 * AAAAAAAA
 * A lot of code convention ecc have being ignored and some bad code practice have being used
 * Reason being i need this library ASAP and will improve it once the tool im writing this lib for
 * is productive
 *
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;
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
      url: 'https://www.cloudflare.com/ips-v4'
    })
      .then((data) => {
        const ranges = data.data.split('\n');
        this._generateIPs(ranges);
      })
      .catch((err) => {
        debugger;
      });
  }

  _generateIPs(ranges) {
    let ips;
    for (const range of ranges) {
      ips = new IPCIDR(range).toArray();
      this.IPs = [...this.IPs, ...ips];
    }

    this.writeArrayToJsonFile(this.IPs);
  }

  writeArrayToJsonFile(ips) {
    fs.writeFile('ips.json', JSON.stringify(ips), 'utf8', (err) => {
      if (err) {
        // call error event
      } else {
        this.update = false;
        this.check(); //ik know, i know its very bad, i will handle every async as it should be correctly handled once i start the rework
      }
    });
  }

  _checkIfExist() {
    return fs.existsSync('ips.json');
  }

  check() {
    if (this.update) {
      this._getRanges();
    } else if (!this._checkIfExist()) {
      this._getRanges();
    } else {
      this.IPs = JSON.parse(fs.readFileSync('ips.json', 'utf8'));
    }
    if (this._isDNS()) this._DNS2IP();
    if (this.IPs.length > 0) {
      // very bad coding ik, i will improve the code quality once i am done with the main tool im working on
      return this._isCloudy();
    }
  }

  _isCloudy() {
    const bFound = this.IPs.includes(this.ip);
    return bFound;
  }
}

module.exports = isCloudy;
