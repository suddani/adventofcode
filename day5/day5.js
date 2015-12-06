var debug = true;
function WordResult() {
  this.numVowels = 0;
  this.chains = 0;
  this.bad = 0;
}
function WordConfig(ss,v,vr,b,cr,crr) {
  this.stack_size = ss||2;

  this.vowels = v||["a", "e", "i", "o", "u"];
  this.numVowelsReq = vr||3;

  this.bad = b||["ab", "cd", "pq", "xy"];

  this.charsInRowReq = cr||2;
  this.charsInRowReqAmmount = crr||1;

  this.check = function(chars, result) {
    //console.log("Check: "+chars);

    //check if new is vowel
    if (this.vowels.includes(chars[chars.length-1])) result.numVowels++;

    //check chain
    var same=true;
    var last=chars[chars.length-1];
    //console.log("From: "+(chars.length-2)+" to["+this.charsInRowReq+"] "+(chars.length-this.charsInRowReq));
    for (var i=chars.length-2;i>=chars.length-this.charsInRowReq;i--) {
      if (last!=chars[i]) {
        same = false;
        break;
      }
    }
    if (same) result.chains++;

    //check bad
    for (var i in this.bad)
      if (chars == this.bad[i]) result.bad++;

    if (result.bad > 0) return false;

    return true;
  }

  this.isGood = function(word, result) {
    if (result.bad > 0) {
      if (debug) console.log("Has bad word");
      return false;
    }
    if (result.chains < this.charsInRowReqAmmount) {
      if (debug) console.log("Not enough chains");
      return false;
    }
    if (result.numVowels < this.numVowelsReq) {
      if (debug) console.log("Not enough vowels");
      return false;
    }
    if (debug) console.log("Is nice");
    return true;
  }

  this.newResult = function() {
    return new WordResult();
  }
}

function WordResult2() {
  this.repeatChains = 0;
  this.repeatChars = 0;

  this.tokens = {};

  this.lastToken = "";

  this.addToken = function(token) {
    var isToken = true;
    if (token in this.tokens) {
      if (debug) console.log("Token exists");
      if (this.lastToken != token) {
        this.tokens[token]++;
      }else {
        this.lastToken = "";
        return;
      }
    } else
      this.tokens[token]=1;

    if (this.tokens[token] == 2)
      this.repeatChains++;

    this.lastToken = token;
  }
}

function WordConfig2() {
  this.stack_size = 3;

  this.check = function(chars, result) {
    if (chars.length >= 2) result.addToken(chars[chars.length-2]+chars[chars.length-1]);
    if (chars.length == 3) {
      if (chars[chars.length-3] == chars[chars.length-1] && chars[chars.length-1] != chars[chars.length-2])
        result.repeatChars++;
    }
  }
  this.isGood = function(word, result) {
    if (result.repeatChains < 1) {
      if (debug) console.log(word+": No pairs");
      return false;
    }
    if (result.repeatChars < 1) {
      if (debug) console.log(word+": No repeat Chars");
      return false;
    }
    return true;
  }
  this.newResult = function() {
    return new WordResult2();
  }
}

function Word(word, cfg) {
  this.stack = "";
  this.config = cfg||new WordConfig();
  this.result = this.config.newResult();

  this.parse = function(word) {
    this.result = this.config.newResult();
    for(var c in word) {
      this.push(word[c]);
      this.config.check(this.stack, this.result);
    }
    this.stack = [];
  }

  this.get = function() {
    return word;
  }

  this.push = function(char) {
    this.stack+=char;
    if (this.stack.length > this.config.stack_size) this.stack = this.stack.slice(1);
  }

  this.isGood = function() {
    return this.config.isGood(word, this.result);
  }

  if (word) this.parse(word);
}
function Parser(_cfg) {

  this.cfg = _cfg||new WordConfig();

  this.goodWords = [];

  this.parseText = function(text, _cfg) {
    var words = text.split("\n");
    console.log("Checking "+words.length+" words");
    for(var w in words) {
      this.parseWord(words[w], _cfg||this.cfg);
    }
  }

  this.parseWord = function(_word, _cfg) {
    var word = new Word(_word, _cfg||this.cfg);
    if (word.isGood()) this.goodWords.push(word.get());
  }

}

function parseText(txt) {
  var parser = new Parser();
  parser.parseText(txt||document.body.innerText);
  console.log("There are "+parser.goodWords.length+" nice words");
}

function parseText2(txt) {
  var parser = new Parser(new WordConfig2());
  parser.parseText(txt||document.body.innerText);
  console.log("There are "+parser.goodWords.length+" nice words");
}

function parseWord(_word) {
  var word = new Word(_word);
  console.log("Word is: "+word.isGood());
  console.log(word);
}

function parseWord2(_word) {
  var word = new Word(_word, new WordConfig2());
  console.log("Word is: "+word.isGood());
  console.log(word);
}
setSolution(1, getInput());
parseText();
parseText2();
