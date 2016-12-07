var request = require('request');
var path = require("path");
var dict = require('./routes/dict');
process.stdin.setEncoding('ascii');
process.stdin.on('data', (input)=>{
	input = input.trim();
   input = input.split(' ');
   dict.getroute(input);
});