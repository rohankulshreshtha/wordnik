var path = require("path");
var api_key = require('../config/key');
var request = require('request');
var waterfall = require('async-waterfall');
module.exports = {
getDefinations : function (word,callback) {
	console.log("here are all the definations");
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if(error) return console.log('Error while fetching Definition from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No Definition found`);		//if empty
          }
    else{
    	for(var def in info){
    		console.log(info[def].text+"\n");
    	}
    }  
    if(callback) callback(null,word);	//callback
	});
},

getExamples : function (word,callback) {
	console.log("here are all the examples");
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/examples?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
     if(error) return console.log('Error while fetching Example from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No Examples found`);		//if empty
          }
    else{
    	for(var ex in info.examples){
    		console.log(info.examples[ex].text+"\n");
    	}
    }  
    if(callback) callback(null,word);	//callback
	});
},

getSynonyms : function (word,callback) {

	console.log("all the synonyms");
	var x = false;
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/relatedWords?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
		if(error) return console.log('Error while fetching Example from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No words found`);		//if empty
          }
    else{
    	for(var syn in info){
    		if(info[syn].relationshipType=='synonym'){
    			console.log(info[syn].words);
    			x = true;
    		}
    	}
    		if(x==false) console.log("no synonyms found");
    }  
    if(callback) callback(null,word);		//callback
	})
},

getAntonyms : function (word,callback) {
	console.log("all the antonyms");
	var x = false;
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/relatedWords?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if(error) return console.log('Error while fetching Example from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No words found`);		//if empty
          }
    else{
    	for(var ant in info){
    		if(info[ant].relationshipType=='antonym'){
    			console.log(info[ant].words);
    			x = true;
    		}
    	}
    	if(x==false) console.log("no antonyms found");
    }  
    if(callback) callback(null,word);		//callback
	})
},

getFullDictionary : function(word){
	console.log("here is full dictionary");
		
		//calling the methods synchronously by the use of waterfall
		//reusing the methods
       waterfall([
         function(callback){
           module.exports.getDefinations(word,callback);
         },
         module.exports.getAntonyms,
         module.exports.getSynonyms,
         module.exports.getExamples,
       ], function(err,result){
          if(err) return console.log('Error while fetching full dictionary from wordnik API',err);		//error
       });
     },

getWod : function () {
	request('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=2016-12-05&api_key='+api_key.key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var word = info.word;
      console.log("word of the day is "+info.word);
      module.exports.getFullDictionary(word);	//displaying full dictionary of word of the day
    }
})
}
}
