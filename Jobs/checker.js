require("dotenv").config();
const Chalk = require("../module/chalk");

const ProxyChecker = require("nodejs-proxy-checkerv2").default;
module.exports = async function main(proxy, timeout) {
  return new Promise(async (res, rej) => {
    try {
      let proxyCode = `${proxy.ipAddress}:${proxy.port}`;

      const proxies = [proxyCode];
      const instance = new ProxyChecker().addProxiesFromArray(proxies);
      const result = await instance.check(null);

      try {
        if (result.length > 0) {
          if (result[0].ProxyStatus == "Alive") {
            res(proxy);
            Chalk.yellow(`${proxyCode}: ${result[0].ProxyStatus}`);
          }
        }
      } catch {
        rej(false);
      }
    } catch {
      rej(false);
    }
    setTimeout(() => {
      rej(false);
    }, parseFloat(process.env.DEFAULT_CHECKER_TIMEOUT_MS) || timeout || 5000);
  });
};
