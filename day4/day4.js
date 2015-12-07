function minAdventCoin(secret) {
  for (var i=0;;i++) {
    var key = secret+i;
    var hash = md5(key);
    if (hash.match(/^00000.*/)) return i;
  }
}

function minAdventCoin6(secret) {
  for (var i=0;;i++) {
    var key = secret+i;
    var hash = md5(key);
    if (hash.match(/^000000.*/)) return i;
  }
}

//Call the functions with your secret key
setSolution(1, "The number is: "+minAdventCoin(getInput()));
setSolution(2, "The number is: "+minAdventCoin6(getInput()));























//end of project
