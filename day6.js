function Grid(dimmer) {
  this.lights = [];
  for(var x=0;x<1000;x++)
    for(var y=0;y<1000;y++)
      this.lights[x+1000*y]=(dimmer ? 0 : false);

  this.turnon = function(_x,_y,xw,yh) {
    // console.log("TurnON: "+_x+","+_y+","+xw+","+yh)
    for(var x=_x;x<=xw;x++)
      for(var y=_y;y<=yh;y++)
        this.lights[x+1000*y]=(dimmer ? this.lights[x+1000*y]+1 : true);
  }
  this.turnoff = function(_x,_y,xw,yh) {
    // console.log("TurnOFF: "+_x+","+_y+","+xw+","+yh)
    for(var x=_x;x<=xw;x++)
      for(var y=_y;y<=yh;y++) {
        this.lights[x+1000*y]=(dimmer ? this.lights[x+1000*y]-1 : false);
        if (dimmer && this.lights[x+1000*y] < 0) this.lights[x+1000*y]=0;
      }
  }
  this.toggle = function(_x,_y,xw,yh) {
    // console.log("TOOGLE: "+_x+","+_y+","+xw+","+yh)
    var runs = 0;
    for(var x=_x;x<=xw;x++) {
      for(var y=_y;y<=yh;y++) {
        this.lights[x+1000*y]=(dimmer ? this.lights[x+1000*y]+2 : !this.lights[x+1000*y]);
      }
    }
  }

  this.lightsOn = function() {
    var lights_on = 0;
    for(var x=0;x<1000;x++) {
      for(var y=0;y<1000;y++) {
        lights_on = (dimmer ? lights_on+this.lights[x+1000*y] : (this.lights[x+1000*y] ? lights_on+1 : lights_on))
      }
    }
    return lights_on;
  }

  this.parse = function(instruction) {
    var result = instruction.match(/turn on (\d+),(\d+) through (\d+),(\d+)/)
    var command = "turnon"
    if (!result) {
      result = instruction.match(/turn off (\d+),(\d+) through (\d+),(\d+)/)
      command = "turnoff"
    }
    if (!result) {
      result = instruction.match(/toggle (\d+),(\d+) through (\d+),(\d+)/)
      command = "toggle"
    }
    if (result)
      this[command](parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]))
  }
}

function parseText(dimmer, str) {
  var grid = new Grid(dimmer);
  var input = str||document.body.innerText.split("\n");
  for (var i in input) {
    grid.parse(input[i]);
  }
  if (dimmer)
    console.log("There total brithness is "+grid.lightsOn()+"");
  else
    console.log("There are "+grid.lightsOn()+" lights turned on");
}

function parseLine(dimmer, str) {
  var grid = new Grid(dimmer);
  grid.parse(str);
  if (dimmer)
    console.log("There total brithness is "+grid.lightsOn()+"");
  else
    console.log("There are "+grid.lightsOn()+" lights turned on");
}

parseText();
parseText(true);
