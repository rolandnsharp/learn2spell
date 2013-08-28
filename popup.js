

var i = 0;
var x = 0;
var iterations = 1;

var wordObject = [
{ word: 'read', definition:'Using Learn2Spell is easy. If, while browsing the web, you come across a word that you wish to drill into memory, highlight the word, right-click, and select \'Learn2Spell\'.' },
{ word: 'this', definition:'You can also add words manually with the input box above.' },
{ word: 'before', definition:'After your word is added to this list, it will automatically take a definition from Wiktionary. If you are not given a definition or are unhappy with the one given, double-click the definition text to add your own.' },
{ word: 'starting', definition:'After you have some words in the list that you wish to drill, start using the touch-typing area. Touch-typing is recommended for drilling words as it utilizes your muscle memory.' },
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
for ( var z = 0; z < wordObject.length; z=z+1 ){    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td>"+"<i id=\"deleteLIP" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    }
};

var deleteLIP = function (XX) {
        wordObject.splice(XX-1, 1);
        runArray(); 
        if (wordObject.length <= 0){
        } else {
        $('h2').text(wordObject[i].word);
        }
        var tabs = chrome.extension.getViews({type: "tab"});
        if (tabs[0]===undefined){
                                        
        console.log("not on front page");
        }else{
         console.log(tabs[0]);
        tabs[0].deleteLI(XX);
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
console.log(WOB);
WOB.push( { word: 'test', definition:'front to back test deffinition' } );          //
WOB.reverse();                                                                      //// clean this up.
WOB.pop();                                                                          //
console.log(WOB);
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
  deleteLIP(clicked.attr("data-id"));
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


