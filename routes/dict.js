var path = require("path");
var api_key = require('../config/key');
var request = require('request');

exports.getroute = function (input) {
	if(input[0]!='./dict'){
		console.log("invalid command");
	}
	else if(input.length==1){
		console.log("word of the day");
	}
	else if(input.length==3 && input[1]=='def'){
		console.log("defination");
	}
	else if(input.length==3 && input[1]=='syn'){
		console.log("syn");
	}
	else if(input.length==3 && input[1]=='ant'){
		console.log("ant");
	}
	else if(input.length==3 && input[1]=='ex'){
		console.log("example");
	}
	else if((input.length==3 && input[1]=='dict') || (input.length==2 && input[1]!='play')){
		console.log("full dict");
	}
	else{
		console.log("play");
	}
}