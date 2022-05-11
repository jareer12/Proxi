const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

module.exports = async function main(proxy, timeout) {
  return new Promise(async (res, rej) => {
    try {
      if (!proxy || !proxy.ipAddress || !proxy.port) {
        rej(false);
      } else {
        const proxyAgent = new HttpsProxyAgent(
          `http://${proxy.ipAddress}:${proxy.port}`
        );
        const response = await fetch(`${"https://httpbin.org/ip?json"}`, {
          agent: proxyAgent,
        });
        const body = await response.text();
        if (body) {
          try {
            let Parsed = JSON.parse(body);
            if (Parsed.origin == proxy.ipAddress) {
              res({ Success: true, Proxy: proxy });
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
        }, timeout || process.env.DEFAULT_CHECKER_TIMEOUT || 3000); // no .env, fallback to 5000
      }
    } catch (err) {
      rej(false);
    }
  });
};
