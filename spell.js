var i = 0;
var x = 0;
var iterations = 1;

var wordObject = [
    { word: 'word', definition:'this word is used for front testing' }
    
];

var loadFunction = function(){
    //chrome.storage.sync.set({"myValue": wordObject}); activate this to get the program running. The emply storage will throw an error 
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
//loadFunction();

var runArray = function (){
 

    if (wordObject.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObject[i].word);
        };
    
    $(".wordlist-table tbody").empty();


for ( var z = i; z < wordObject.length; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();

    }
 
for ( var z = 0; z < i; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();
    
    }

//console.log(wordObject);
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
        /////////////////////////////////////////////////////
        
        runArray();

};

var loadBackgroundList = function (){
 
var WOB = chrome.extension.getBackgroundPage().wordObjectB;
console.log(WOB);
console.log(wordObject);

while (WOB.length > 1)
  {
  wordObject[wordObject.length]= WOB[WOB.length-1];
  WOB.splice(WOB.length-1);
  }

//wordObject[wordObject.length]= WOB[WOB.length-1];
console.log(wordObject);

runArray();
chrome.storage.sync.set({"myValue": wordObject});///save
chrome.extension.getBackgroundPage().wordObjectB=[
    { word: 'test', definition:'test deffinition' } ];
 chrome.extension.getBackgroundPage().runArrayB();
runArray();
};


$(document).ready(function () {   
loadFunction();    

    $('#noi').text(iterations);
    $("#plusOne").click(function() {
    iterations = iterations +1;
    $('#noi').text(iterations);
    var x = 0;
});
    $("#minusOne").click(function() {
        if (iterations<=2){
            iterations = 2;
            var x = 0;
        }
    iterations = iterations -1;
    $('#noi').text(iterations);
    var x = 0;
});

$("#hideButton").click(function() {
  $('.wordlist-container').toggle();

});

runArray();  

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

$('#enterListButton').click(function(){

var spellItem = document.getElementById('listInput'); 
    wordObject[wordObject.length]= { word: spellItem.value, definition: "...definition..." };
        console.log(wordObject);///////////////////////////////////////////////////////

        document.getElementById("listInput").value = "";
        runArray();

        $('.spellList').show();
        $('h2').text(wordObject[i].word); 
        chrome.storage.sync.set({"myValue": wordObject}); //////// save
});

$('#listInput').keypress(function(e) {
 var spellItem = document.getElementById('listInput');   ///////////////// same function as enterlistbutton


    if(e.which == 13) {
        
        wordObject[wordObject.length]= { word: spellItem.value, definition: "...definition..." };
        console.log(wordObject);
        document.getElementById("listInput").value = "";
        runArray();
        $('.spellList').show();
        $('h2').text(wordObject[i].word); 
        chrome.storage.sync.set({"myValue": wordObject}); /////save
                                    
    } 

});

});

$(document).ready(function(){   

    $('#spellbox').focus();

var input = $('#spellbox'),
label = $('#inputHiddenSpan');
$('#spellbox').keypress(function(e) {
    input.bind('keydown keypress', function() {
        setTimeout(function() {
        label.text(input.val());
        
        var spell = document.getElementById('spellbox');
        
        if (spell.value==="" && x%iterations===0) {             
            $('h2').text(wordObject[i].word);
                    
        }  else if (e.which == 8 && spell.value==="") {     //e.which == 8 not working (reveal word when backspace
            $('h2').text(wordObject[i].word);
                                     // empty #spellbox. Eventult make it reveal on backspace 
        }  else if (spell.value==="" && x%iterations!==0) {
            $('h2').text("Spell it again!");
            if (document.getElementById("check1").checked===true){
            $('h2').text(wordObject[i].word);}
        }  else {                                           // of last charactor.
            $('h2').empty(); 
            //$('.wordlist-container').hide();    ///////////////////////////// toggle is causing an error where hide(); is not.
            
            if (document.getElementById("check1").checked===true) {
            $('h2').text(wordObject[i].word);}

        }    
        
    }, 0); 
});
});

//////////////////////////////////////////////////////

$('#spellbox').keypress(function(e) {   
 var spell = document.getElementById('spellbox');   
 //defineFunction();
    if(e.which == 13) {
                        
        if (spell.value===wordObject[i].word) {
            
            x=x+1;
            
            if (x%iterations===0) {
                //alert('press enter and continue to the next word');///////////////////////// alert off
                i = (i+1);
                
                if (wordObject.length <= i) {          
                i=0;    
                //defineFunction();                
                } 
            }

            $('h2').text(wordObject[i].word);
            if (document.getElementById("check1").checked===true){
            $('h2').text(wordObject[i].word);}
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});
            runArray(); 

            document.getElementById("spellbox").value = "";
            //$('.spellList').hide();
             } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});  // $(".class").animate({"background-color":"red"},40).animate({"background-color":"transparent"},40);
                    runArray(); 
                    }

    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').text(wordObject[i].word); 
        
        if (document.getElementById("check1").checked===true){
        $('h2').text(wordObject[i].word);}

    }
});
});

var baseURL = 'http://en.wiktionary.org';
function showPage(page,text) {
  var sourceurl = baseURL + '/wiki/' + page;
  $('#pagetitle').text(page);
  //var wikibox = "";
  $('#wikiInfo').html(text);
  $('#sourceurl').attr('href',sourceurl);
  $('#licenseinfo').show();
  $('#wikiInfo').children("ol:lt(1)").attr('',   ///////////////////////// change number of drfinitions eg verb and noun
    function() { //console.log(this);
  //this.children("li:nth-child(-n+2)");
  $(" ol li ul").detach();
  $(" ol li ul").detach();
  var wikiDefine = this.textContent;
  var wikiDefineShort = jQuery.trim(wikiDefine).substring(0, 500)  /////// shortening the definition for google local storage
                          .trim(this) + "...";
    runArray();  
    wordObject[wordObject.length]= { word: page, definition: wikiDefineShort };
    runArray();
    chrome.storage.sync.set({"myValue": wordObject}); /////save
  });
}

$(document).ready(function() {
  $('#pagetitle').hide();
  $('#word').change(function() {
    var page = this.value.toLowerCase();
    $('#loading').html('...please wait...');
    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
    function(json) {
                                          $('#loading').html('');
                                          console.log(json.parse);
                                          if(json.parse === undefined) {
                                            console.log("word not found");
                                            wordObject[wordObject.length]= { word: page, definition: "word not found - double click here to add definition" };
                                              runArray();
                                              chrome.storage.sync.set({"myValue": wordObject}); /////save
                                              document.getElementById("word").value = "";
                                          } else {
                                            showPage(page,json.parse.text['*']);
                                            $('#wikiInfo').html("<div></div>");
                                            document.getElementById("word").value = "";
                                          }
    });
  });
});