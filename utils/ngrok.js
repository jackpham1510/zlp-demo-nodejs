const axios = require('axios').default;
const config = require('../config.json')

class Ngrok {
  async GetPublicURL() {
    const { data } = await axios.get(config.ngrok.tunnels);
    return data.tunnels[0].public_url;
  }
}

module.exports = new Ngrok();