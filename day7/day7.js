// Operator	Usage	Description
// Bitwise AND	a & b	Returns a one in each bit position for which the corresponding bits of both operands are ones.
// Bitwise OR	a | b	Returns a one in each bit position for which the corresponding bits of either or both operands are ones.
// Bitwise XOR	a ^ b	Returns a one in each bit position for which the corresponding bits of either but not both operands are ones.
// Bitwise NOT	~ a	Inverts the bits of its operand.
// Left shift	a << b	Shifts a in binary representation b (< 32) bits to the left, shifting in zeroes from the right.
// Sign-propagating right shift	a >> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off.
// Zero-fill right shift	a >>> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off, and shifting in zeroes from the left.


function modulo(a, b) {
  var m = a - Math.floor(a/b)*b;
  //console.log("Modulo: "+m);
  return m;
}
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
function ToUint32(x) {
  return modulo(ToInteger(x), Math.pow(2, 32));
}
function ToUint16(x) {
  return modulo((x), Math.pow(2, 16));
}
function isInt(n) {
  return parseInt(n) === n;
};

function Circut() {
  this.wires = {};
  this.values = {};
  this.addWire = function(name, wire) {
    console.log("Add wire: "+name+" - "+wire.input.command);
    this.wires[name] = wire;
  }
  this.getWireValue = function(name) {
    // console.log("Get WireValue of "+name)
    if (name in this.values) return this.values[name];
    if (name in this.wires) this.values[name]= this.wires[name].value();
    else this.values[name]= parseInt(name);
    return this.values[name];
  }
  this.parse = function(line) {
    this.values = {};
    var result = line.match(/^(\w+) -> (\w+)/)
    if (result) this.addWire(result[2], new Wire(new Input("NONE", result[1], null, this)));
    result = null;

    result = line.match(/NOT (\w+) -> (\w+)/)
    if (result) this.addWire(result[2], new Wire(new Input("NOT", result[1], null, this)));
    result = null;

    result = line.match(/(\w+) AND (\w+) -> (\w+)/)
    if (result) this.addWire(result[3], new Wire(new Input("AND", result[1], result[2], this)));
    result = null;

    result = line.match(/(\w+) OR (\w+) -> (\w+)/)
    if (result) this.addWire(result[3], new Wire(new Input("OR", result[1], result[2], this)));
    result = null;

    result = line.match(/(\w+) LSHIFT (\w+) -> (\w+)/)
    if (result) this.addWire(result[3], new Wire(new Input("LSHIFT", result[1], result[2], this)));
    result = null;

    result = line.match(/(\w+) RSHIFT (\w+) -> (\w+)/)
    if (result) this.addWire(result[3], new Wire(new Input("RSHIFT", result[1], result[2], this)));
    result = null;
  }
}

function Input(_command, _val1, _val2, wires) {
  this.command = _command;
  this.val1 = _val1;
  this.val2 = _val2;
  this.calc = function() {
    switch(this.command) {
      case "NOT":
        console.log("NOT: "+this.val1);
        return ToUint16(~wires.getWireValue(this.val1));
      break;
      case "OR":
        console.log("Return: "+this.val1+" OR "+this.val2);
        return ToUint16(wires.getWireValue(this.val1)|wires.getWireValue(this.val2));
      break;
      case "AND":
        console.log("Return: "+this.val1+" AND "+this.val2);
        return ToUint16(wires.getWireValue(this.val1)&wires.getWireValue(this.val2));
      break;
      case "LSHIFT":
        console.log("Return: "+this.val1+" << "+this.val2);
        return ToUint16(wires.getWireValue(this.val1) << wires.getWireValue(this.val2));
      break;
      case "RSHIFT":
        console.log("Return: "+this.val1+" >> "+this.val2);
        return ToUint16(wires.getWireValue(this.val1) >> wires.getWireValue(this.val2));
      break;
      case "NONE":
        console.log("Return: "+this.val1);
        return ToUint16(wires.getWireValue(this.val1));
      break;
    }
  }
}
function Wire(_input) {
  this.input = _input;
  this.value = function() {
    return this.input.calc();
  }
}

function parseLine(line, w) {
  var circut = new Circut();
  circut.parse(line);
  console.log("Wire "+w+" is "+circut.getWireValue(w));
}

function parseText(_input) {
  var circut = new Circut();
  var input = (_input||getInput()).split("\n");
  for (var i in input)
    circut.parse(input[i]);
  return circut;
}

var _circut = parseText();
setSolution(1, _circut.getWireValue("a"))
_circut.parse(""+_circut.getWireValue("a")+" -> b");
setSolution(2, _circut.getWireValue("a"))
