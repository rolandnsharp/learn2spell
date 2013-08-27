

var i = 0;
var x = 0;
var iterations = 1;

var wordObject = [
{ word: 'read', definition:'Using Learn2Spell is easy. If, while browsing the web, you come accross a word that you would like to drill into memory. Highlight the word, right-click, and select \'Learn2Spell\'.' },
{ word: 'here', definition:'You can also add words manually with the input box above.' },
{ word: 'before', definition:'After your word is added to this list, it will automaticially take a definition from Wikionary. If you are not given a definition or are unhappy with the one given just double-click the definition text to add your own.' },
{ word: 'starting', definition:'this word is used for front testing' },
{ word: 'word', definition:'After you have some words in the list that you wish to drill. Start using the touch-typing area. touch-typing is recomemded for drilling the words into memory as it utilizes your muscle memory. If you can\'t touch-type try typing acadamy' },
{ word: 'word', definition:'this word is used for front testing' },
{ word: 'word', definition:'this word is used for front testing' }
];

var loadFunction = function(){
    chrome.storage.sync.get("myValue", //// load saved data. 
    function(val) {
    if (val.myValue === undefined){
        chrome.storage.sync.set({"myValue": wordObject});
        loadBackgroundList();
        runArray();
    } else {
    wordObject=val.myValue;
    runArray();
    console.log(wordObject);
    loadBackgroundList();
    }   
  });
 }; 

var runArray = function (){
    if (wordObject.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObject[i].word);
        };    
    $(".wordlist-table tbody").empty();
for ( var z = i; z < wordObject.length; z=z+1 ){    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    }
for ( var z = 0; z < i; z=z+1 ){
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    }
};

var deleteLI = function (XX) {
        wordObject.splice(XX-1, 1);
        runArray(); 
        if (wordObject.length <= 0){
        } else {
        $('h2').text(wordObject[i].word);
        }
        };

var editLI = function (TT){
var defItem = prompt("edit definition");
    wordObject[TT-1]= { word: wordObject[TT-1].word, definition: defItem };
    chrome.storage.sync.set({"myValue": wordObject}); /////save
    runArray();
};

var loadBackgroundList = function (){
var WOB = chrome.extension.getBackgroundPage().wordObjectB;
while (WOB.length > 1)
  {
  wordObject[wordObject.length]= WOB[WOB.length-1];
  WOB.splice(WOB.length-1);
  }
runArray();
chrome.storage.sync.set({"myValue": wordObject});///save
chrome.extension.getBackgroundPage().wordObjectB=[ { word: 'test', definition:'front to back test deffinition' } ];
chrome.extension.getBackgroundPage().runArrayB();
runArray();
};

$(document).ready(function () {   
loadFunction();    

$("#hideButton").click(function() {
  chrome.tabs.create({url:"index.html"});
});

runArray();  //////needed?

$('body').on('click',  ".icon-remove", function (ev) {
    var clicked=$(ev.currentTarget);
  deleteLI(clicked.attr("data-id"));
  runArray();  
  chrome.storage.sync.set({"myValue": wordObject}); //////// save
});

$('body').on('dblclick',  "td", function (ev) {
    var clicked=$(ev.currentTarget);
    editLI(clicked.attr("data-id"));
    runArray();  
  chrome.storage.sync.set({"myValue": wordObject}); //////// save
});
});


