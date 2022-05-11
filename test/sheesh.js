const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

(async () => {
  const proxyAgent = new HttpsProxyAgent("http://45.229.205.162:55555");
  const response = await fetch("/verify", {
    agent: proxyAgent,
  });
  const body = await response.text();
  if (body.origin) {
  }
  console.log(body);
})();
