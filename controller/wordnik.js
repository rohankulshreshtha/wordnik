var path = require("path");
var api_key = require('../config/key');
var request = require('request');

exports.getdef = function (word) {
	var array=[];
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    for(var def in info){
		array.push(info[def].text);
	}
    }
    else
    	console.log("error getting the defination of the word");
	})
	return array;
};

exports.getex = function (word) {
	var array=[];
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/examples?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    for(var ex in info){
		array.push(info[ex].text);
	}
    }
    else
    	console.log("error getting the example of the word");
	})
	return array;
};

exports.getsyn = function (word) {
	var array=[];
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/relatedWords?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    for(var ex in info){
		if(info[ex].relationshipType=='synonym')
			array=info[ex].words;
	}
    }
    else
    	console.log("error getting the example of the word");
	})
	return array;
};

exports.getant = function (word) {
	var array=[];
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/relatedWords?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    for(var ex in info){
		if(info[ex].relationshipType=='antonym')
			array=info[ex].words;
	}
    }
    else
    	console.log("error getting the example of the word");
	})
	return array;
};

exports.getwod = function (word) {
	var word;
	request('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=2016-12-05&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      word = info.word;
    }
})
	return word;
};