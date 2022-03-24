/*
 * AAAAAAAA
 * A lot of code convention ecc have being ignored and some bad code practice have being used
 * Reason being i need this library ASAP and will improve it once the tool im writing this lib for
 * is productive
 *
 */

const EventEmitter = require('events');
const fs = require('fs');
const dns = require('dns').promises;
const axios = require('axios').default;
const IPCIDR = require('ip-cidr');

class isCloudy {
  constructor(host, update) {
    this.ip = this._validateHost(host);
    this.update = update || false;
    this.IPs = [];
  }

  async check() {
    if (this.update) {
      this._getRanges();
    } else if (this._checkIfExist()) {
      this._getRanges();
    } else {
      this.IPs = JSON.parse(fs.readFileSync('ips.json'));
    }

    if (this.IPs.length > 0) {
      // very bad coding ik, i will improve the code quality once i am done with the main tool im working on
      return await this._isCloudy();
    }
  }

  _validateHost(host) {
    if (typeof host !== 'string' && !Array.isArray(host)) {
      throw new TypeError('Invalid type');
    }

    return host;
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

    this._writeArrayToJsonFile(this.IPs);
  }

  _writeArrayToJsonFile(ips) {
    fs.writeFile('ips.json', JSON.stringify(ips), 'utf8', (err) => {
      if (err) {
        // call error event
      } else {
        this.update = false;
        this.check(); // ik know, i know its very bad, i will handle every async as it should be correctly handled once i start the rework
      }
    });
  }

  _checkIfExist() {
    return !fs.existsSync('ips.json');
  }

  async _ValidateIp(ip) {
    ip = await dns.lookup(ip);
    return ip.address;
  }

  async _isCloudy() {
    let results = [];
    let bFound;
    if (typeof this.ip === 'string') {
      bFound = this.IPs.includes(await this._ValidateIp(this.ip));
      results = {
        target: this.ip,
        CloudFlare: bFound
      };
    } else {
      for (const ip of this.ip) {
        bFound = this.IPs.includes(await this._ValidateIp(ip));
        results.push({
          target: ip,
          CloudFlare: bFound
        });
      }
    }

    return results;
  }
}

module.exports = isCloudy;
