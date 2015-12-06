function floor(dir) {
  var f = 0;
  for(var i in dir) {
    if(dir[i] == "(") {
      f+=1;
    } else if(dir[i] == ")") {
      f-=1;
    }
  }
  return f;
}
s1 = "He is on floor: "+floor(getInput());
console.log(s1)
setSolution(1, s1);

function enterbasement(dir) {
  var f = 0;
  for(var i in dir) {
    if(dir[i] == "(") {
      f+=1;
    } else if(dir[i] == ")") {
      f-=1;
    }
    // console.log("Floor: "+f+" - "+i);
    if (f < 0) return i;
  }
  return -1;
}

s2 = "Enters basement after: "+enterbasement(getInput());
console.log(s2)
setSolution(2,s2)
