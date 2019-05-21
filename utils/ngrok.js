const axios = require('axios').default;

class Ngrok {
  async GetPublicURL() {
    const { data } = await axios.get("http://localhost:4040/api/tunnels");
    return data.tunnels[0].public_url;
  }
}

module.exports = new Ngrok();