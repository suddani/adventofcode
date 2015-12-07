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

function BASIC_COMMAND(name, regex, params, operation) {
  this.name = name;
  this.regex = regex;
  this.params = params;
  if (!"name" in this.params) alert("WRONG Command")
  if (!"val1" in this.params && !"val2" in this.params) alert("WRONG Command")

  this.getVal1 = function (result) {
    if ("val1" in this.params) return result[this.params.val1];
    return null;
  }
  this.getVal2 = function (result) {
    if ("val2" in this.params) return result[this.params.val2];
    return null;
  }
  this.parse = function(line) {
    var result = line.match(this.regex)
    if (result) return [result[this.params.name], new Input(this, this.getVal1(result), this.getVal2(result))];
    return null;
  }
  this.do = operation;
}

function Circut() {
  this.wires = {};
  this.values = {};
  this.commands = [
    new BASIC_COMMAND("RSHIFT", /NOT (\w+) -> (\w+)/, {name:2,val1:1}, function(val){
      return ToUint16(~val);
    }),
    new BASIC_COMMAND("OR", /(\w+) OR (\w+) -> (\w+)/, {name:3,val1:1,val2:2}, function(val1,val2){
      return ToUint16(val1|val2);
    }),
    new BASIC_COMMAND("RSHIFT", /(\w+) RSHIFT (\w+) -> (\w+)/, {name:3,val1:1,val2:2}, function(val1,val2){
      return ToUint16(val1>>val2);
    }),
    new BASIC_COMMAND("LSHIFT", /(\w+) LSHIFT (\w+) -> (\w+)/, {name:3,val1:1,val2:2}, function(val1,val2){
      return ToUint16(val1<<val2);
    }),
    new BASIC_COMMAND("AND", /(\w+) AND (\w+) -> (\w+)/, {name:3,val1:1,val2:2}, function(val1,val2){
      return ToUint16(val1&val2);
    }),
    new BASIC_COMMAND("NONE", /^(\w+) -> (\w+)/, {name:2,val1:1}, function(val){
      return ToUint16(val);
    })
  ];

  this.addWire = function(name, wire) {
    this.values = {};
    console.log("Add wire: "+name+" - "+wire.input.command.name);
    this.wires[name] = wire;
  }

  this.getWireValue = function(name) {
    if (name in this.values) return this.values[name];
    if (name in this.wires) this.values[name]= this.wires[name].value(this);
    else this.values[name]= parseInt(name);
    return this.values[name];
  }

  this.parse = function(line) {
    for (var i in this.commands) {
      var result = this.commands[i].parse(line);
      if (result) {
        this.addWire(result[0], new Wire(result[1], this));
        break;
      }
    }
  }
}

function Input(_command, _val1, _val2) {
  this.command = _command;
  this.val1 = _val1;
  this.val2 = _val2;
  this.calc = function(wires) {
    return this.command.do(
          ToUint16(wires.getWireValue(this.val1)),
          ToUint16(wires.getWireValue(this.val2))
    );
  }
}
function Wire(_input, _wires) {
  this.input = _input;
  this.wires = _wires;
  this.value = function(wires) {
    return this.input.calc(this.wires||wires);
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
setSolution(1, "3176 ?= "+_circut.getWireValue("a"))
_circut.parse(""+_circut.getWireValue("a")+" -> b");
setSolution(2, "14710 ?= "+_circut.getWireValue("a"))
