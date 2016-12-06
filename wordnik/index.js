var request = require('request');
var word;
request('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=2016-04-22&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      word = info.word;
      console.log(word);
    }
})

request('http://api.wordnik.com:80/v4/word.json/good/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    }
})