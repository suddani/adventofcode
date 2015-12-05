function Santa() {
  this.move = function(input) {
    if (input == "^") this.y++;
    else if (input == "<") this.x--;
    else if (input == ">") this.x++;
    else if (input == "v") this.y--;
    if (this.key() in this.history)
      this.history[this.key()]++;
    else
      this.history[this.key()]=1;
  }
  this.key = function() {
    return ""+this.x+"x"+this.y;
  }
  this.homesVisited = function(histories) {
    if (histories) {
      var combinedHistory = this.history;
      for (var h in histories) {
        var newHistory = histories[h];
        for (var key in newHistory) {
          if (key in combinedHistory) {
            combinedHistory[key]+=newHistory[key];
          } else {
            combinedHistory[key]=newHistory[key];
          }
        }
      }
      return Object.keys(combinedHistory).length;
    }
    else
      return Object.keys(this.history).length;
  }

  this.x = 0;
  this.y = 0;
  this.presentsDelivered = 0;
  this.history = {};
  this.history[this.key()]=1;
}

function deliver(_in) {
  var santa = new Santa();
  var input = _in||document.body.innerText;
  for (var i in input) {
    santa.move(input[i]);
  }
  console.log("Santa visits: "+santa.homesVisited());
}
function deliverRobo(_in) {
  var santa = new Santa();
  var robosanta = new Santa();
  var santasturn = true;

  var input = _in||document.body.innerText;
  for (var i in input) {
    if (santasturn) santa.move(input[i]);
    else robosanta.move(input[i]);
    santasturn = !santasturn;
  }

  console.log("Santa and RoboSanta visit: "+santa.homesVisited([robosanta.history]));
}

deliver();
deliverRobo();
