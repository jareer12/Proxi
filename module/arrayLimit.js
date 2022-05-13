module.exports = function getRandom(arr, n) {
  n = arr.length >= n ? n : arr.length;
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    return ["More items requested then given"];
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
