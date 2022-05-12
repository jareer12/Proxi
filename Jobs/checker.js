require("dotenv").config();

const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

module.exports = async function main(proxy, timeout) {
  return new Promise(async (res, rej) => {
    let URL = `http://${proxy.ipAddress}:${proxy.port}`;
    try {
      if (!proxy || !proxy.ipAddress || !proxy.port) {
        rej(false);
      } else {
        const proxyAgent = new HttpsProxyAgent(URL);
        const response = await fetch(`${"https://httpbin.org/ip?json"}`, {
          agent: proxyAgent,
        });
        const body = await response.text();
        if (body) {
          try {
            let Parsed = JSON.parse(body);
            if (Parsed.origin == proxy.ipAddress) {
              try {
                fetch(URL)
                  .then((response) => {
                    res({ Success: true, Proxy: proxy });
                  })
                  .catch((error) => {
                    rej(false);
                  });
              } catch {
                rej(false);
              }
            } else {
              rej(false);
            }
          } catch {
            rej(false);
          }
        } else {
          rej(false);
        }
        setTimeout(() => {
          rej(false);
        }, parseFloat(process.env.DEFAULT_CHECKER_TIMEOUT_MS) || timeout || 5000); // no .env, fallback to default
      }
    } catch (err) {
      rej(false);
    }
  });
};
