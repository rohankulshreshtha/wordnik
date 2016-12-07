var path = require("path");
var api_key = require('../config/key');
var wordnik = require('../controller/wordnik');
var gameInstance = require('../controller/game');
//var request = require('request');

var gameObject = {
    on:false,
    word:'elevating',
    choice:false
    };

exports.getroute = function (input) {
	if(gameObject.on==true && gameObject.choice==false){
			gameInstance.getCorrect(gameObject,input[0]);
		}
	else if(gameObject.on==true && gameObject.choice==true){
		switch(input[0]){
                case '1':
                    console.log("enter again");
                    gameObject.choice=false;
                    break;
                case '2':
                    console.log('Following is a hint, a jumbled word.');
                    gameInstance.getJumbled(gameObject.word);
                    break;
                case '3':
                    console.log('Game Over! Following is full dictionary of the answer.');

                    //showing complete dictionary of the word
                    wordnik.getFullDictionary(gameObject.word);

                    //reseting
                    gameObject.on = false;
                    gameObject.choice = false;
                    break;
                default:
                    console.log('Please, enter correct choice (1,2,3).');
            }
	}
	else if(input[0]!='./dict'){
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
		if(input.length==3 && input[1]=='dict'){
		wordnik.getFullDictionary(input[2]);}
		else
			wordnik.getFullDictionary(input[1]);
	}
	else if(input.length==2 && input[1]=='play'){
		gameInstance.getInfo(gameObject);
		gameObject.on=true;
	}
}
