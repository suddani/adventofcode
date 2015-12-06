function Present(dim) {

  var result = dim.match(/(\d+)x(\d+)x(\d+)/)

  var valid = true;
  if (result) {
    this.l = result[1];
    this.w = result[2];
    this.h = result[3];
  }
  else {
    valid = false;
  }
  this.calcVolume = function() {
    if (!valid) return 0;
    return this.l*this.w*this.h;
  }
  this.calcSmalestPeri = function() {
    if (!valid) return 0;
    var slack = 2*this.l+2*this.w;
    if (2*this.w+2*this.h < slack) slack = 2*this.w+2*this.h;
    if (2*this.h+2*this.l < slack) slack = 2*this.h+2*this.l;
    return slack;
  }
  this.calcSurface = function() {
    if (!valid) return 0;
    return 2*this.l*this.w + 2*this.w*this.h + 2*this.h*this.l;
  }
  this.calcSlack = function() {
    if (!valid) return 0;
    var slack = this.l*this.w;
    if (this.w*this.h < slack) slack = this.w*this.h;
    if (this.h*this.l < slack) slack = this.h*this.l;
    return slack;
  }
  this.totalNeeded = function() {
    if (!valid) return 0;
    return this.calcSlack()+this.calcSurface();
  }
  this.calcRibbonNeeded = function() {
    return this.calcVolume()+this.calcSmalestPeri();
  }
}

function calcTotal(f, _input) {
  var input = (_input||getInput()).split("\n");
  var ammountNeeded = 0;
  for(var i in input) {
    var present = new Present(input[i]);
    ammountNeeded+= present[f]();
  }
  return ammountNeeded;
}

setSolution(1, "Paper: "+calcTotal("totalNeeded"))
setSolution(2, "Ribbon: "+calcTotal("calcRibbonNeeded"))
