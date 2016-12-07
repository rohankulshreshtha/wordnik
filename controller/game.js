var path = require("path");
var api_key = require('../config/key');
var request = require('request');
var waterfall = require('async-waterfall');
module.exports = {
getCorrect : function (gameObject,check,callback) {
	request('http://api.wordnik.com:80/v4/word.json/' + gameObject.word + '/relatedWords?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if(error) return console.log('Error while fetching Definition from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No Definition found`);		//if empty
          }
    else{
    	for(var syn in info){
    		if(info[syn].relationshipType=='synonym'){
    			if((info[syn].words.indexOf(check) != -1) || gameObject.word == check){		//right answer
    				console.log("right answer");
    				console.log("try other synonyms");
    			}
    			else{ 
    				console.log("try again");				//wrong answer
    				console.log("enter 1 or 2 or 3");
    				gameObject.choice=true;
    			}
    		}
    	}
    }  
    if(callback) callback(null,word);
	})
},
 getJumbled : function (w){
 	 w=w.split('');		//splitting
            var n=w.length,
                jumble =0,
                temp = 0;


            while(n){
                jumble = parseInt(Math.random() * (n - 1));
                //swap with last one
                temp = w[jumble];
                w[jumble]= w[n-1];
                w[n-1] = temp;
                n--;
            }
            console.log(w.join(''));		//joining
            console.log('Please, enter correct choice (1,2,3).');
 },
 getDefination : function (word,callback) {
	request('http://api.wordnik.com:80/v4/word.json/' + word + '/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key='+api_key.key, function (error, response, body) {
    if(error) return console.log('Error while fetching Definition from wordnik API',error);		//error
    var info = JSON.parse(body);
    if(info.length == 0) {
              console.log(`No Definition found`);		//if empty
          }
    else{
    		console.log("defination :- "+info[0].text+"\n");
    }  
    if(callback) callback(null,word);
	});
},
getSynonym : function (word,callback) {
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
    			console.log("synonym :-"+info[syn].words[0]);
    			x = true;
    		}
    	}
    		if(x==false) console.log("no synonyms found");
    }  
    if(callback) callback(null,word);
	})
},
getAntonym : function (word,callback) {
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
    			console.log("antonym :-"+info[ant].words[0]);
    			x = true;
    		}
    	}
    	if(x==false) console.log("no antonyms found");
    }  
    if(callback) callback(null,word);
	})
},
 getInfo : function(gameObject){
 		//calling the methods synchronously by the use of waterfall
		//reusing the methods
 	waterfall([
         function(callback){
           module.exports.getDefination(gameObject.word,callback);
         },
         module.exports.getSynonym,
         module.exports.getAntonym
       ], function(err,result){
          if(err) return console.log('Error while fetching full dictionary from wordnik API',err);		//error
       });
 }
}
