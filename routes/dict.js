var path = require("path");
var api_key = require('../config/key');
var wordnik = require('../controller/wordnik');
var request = require('request');

exports.getroute = function (input) {
	if(input[0]!='./dict'){
		console.log("invalid command");
	}
	else if(input.length==1){
		wordnik.getWod();
	}
	else if(input.length==3 && input[1]=='def'){
		wordnik.getDefinations(input[2]);
	}
	else if(input.length==3 && input[1]=='syn'){
		wordnik.getSynonyms(input[2]);
	}
	else if(input.length==3 && input[1]=='ant'){
		wordnik.getAntonyms(input[2]);
	}
	else if(input.length==3 && input[1]=='ex'){
		wordnik.getExamples(input[2]);
	}
	else if((input.length==3 && input[1]=='dict') || (input.length==2 && input[1]!='play')){
		wordnik.getFullDictionary(input[2]);
	}
	else{
		console.log("play");
	}
}
