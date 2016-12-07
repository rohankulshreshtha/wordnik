var request = require('request');
var path = require("path");
var dict = require('./routes/dict');
console.log("welcome to command line directory using wordnik apis");

//getting input from the console

process.stdin.setEncoding('ascii');   
process.stdin.on('data', (input)=>{
	input = input.trim();
   input = input.split(' ');
   dict.getroute(input);
});
