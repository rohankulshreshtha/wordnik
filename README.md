# wordnik
wordnik cld in node.js

Introduction

  Command Line Dictionary Tool using wordnik apis build on node.js.
  you can do the follwing things.
  a. Word Definitions
	Display definitions of a word. 
	./dict def <word>
  b. Word Synonyms
	Display synonyms of a word. 
	./dict syn <word>
  c. Word Antonyms
	Display antonyms of a word
	./dic ant <word>
  d. Word Examples
	Display examples of a word
	./dict ex <word>
  e. Word Full Dict
	Display all above details for a word
	./dict <word> or ./dict dict <word>
  f. Word of the Day Full Dict
	Display all above details of word of the day
	./dict
  g. play a game
  ./dict play
    if word is right (display correct)
    if wrong three choices (1. enter again  2. hint or jumbled word  3.exit)
  

Installation

a. clone or download the project.
b. go to project path and execute (npm install).
c. run the command (node index.js).
d. run command (./dict play)
e. enjoy (right word is "elevating")

API Reference

wordnik apis.
async-waterfall - version(0.1.5) - used for calling functions synchronously

Author name - Rohan Kulshreshtha.(email - rohankulshreshtha.bkn@gmail.com)
