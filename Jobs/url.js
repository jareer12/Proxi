module.exports = function main(data) {
  if (!data) data = {};
  return `https://api.proxyscrape.com/v2/?request=displayproxies&protocol=${
    data.protocol || "http"
  }&timeout=${data.timeout || 10000}&country=${data.country || "all"}&ssl=${
    data.ssl || "all"
  }&anonymity=${data.anonymity || "all"}`;
};
