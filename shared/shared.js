function modulo(a, b) {
  return a - Math.floor(a/b)*b;
}

function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function ToUint32(x) {
  return modulo(ToInteger(x), Math.pow(2, 32));
}

function ToUint16(x) {
  return modulo(x, Math.pow(2, 16));
}

function isInt(n) {
  return parseInt(n) === n;
};

function setSolution(id, solution) {
  document.getElementById('solution'+id).innerText = solution;
}

function getInput() {
  return document.getElementById('text').innerText;
}
