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
console.log("He is on floor: "+floor(document.body.innerText))

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

console.log("Enters basement after: "+enterbasement(document.body.innerText))
