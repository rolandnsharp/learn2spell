var i = 0;
var x = 0;
var iterations = 4;

var wordObject = [
{ word: 'read', definition:'Using Learn2Spell is easy. If, while browsing the web, you come across a word that you wish to drill into memory, highlight the word, right-click, and select \'Learn2Spell\'.' },
{ word: 'this', definition:'You can also add words manually with the input box above.' },
{ word: 'before', definition:'After your word is added to this list, it will automatically take a definition from Wiktionary. If you are not given a definition or are unhappy with the one given, double-click the definition text to add your own.' },
{ word: 'starting', definition:'After you have some words in the list that you wish to drill, start using the touch-typing area. Touch-typing is recommended for drilling words as it utilizes your muscle memory.' },
];


var oneStep = function () {  
   var shifted = wordObject.shift();
   wordObject[wordObject.length] = shifted;
   chrome.storage.sync.set({"myValue": wordObject});//
};

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
    loadBackgroundList();
    }   
  });
 }; 

var runArray = function (){
    if (wordObject.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').html(wordObject[i].word+"<i class=\"icon-volume-up\"></i>");
        };    
    $(".wordlist-table tbody").empty();
for ( var z = 0; z < wordObject.length; z=z+1 ){    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    }
    $('h3').empty();
for ( var d = 0; d < wordObject[0].word.length; d=d+1 ){    
    
    $('h3').append("<h7>"+wordObject[0].word.substring(d, d+1)+"</h7>");
    }
    

};

var deleteLI = function (XX) {
        wordObject.splice(XX-1, 1);
        runArray(); 
        if (wordObject.length <= 0){
        } else {
        $('h2').html(wordObject[i].word+"<i class=\"icon-volume-up\"></i>");
        }
        };

var editLI = function (TT){
var defItem = prompt("edit definition");
    if (defItem===null){
      return;
    }else{
    wordObject[TT-1]= { word: wordObject[TT-1].word, definition: defItem };
    chrome.storage.sync.set({"myValue": wordObject}); /////save
    runArray();
    }
};

var loadBackgroundList = function (){
var WOB = chrome.extension.getBackgroundPage().wordObjectB;
WOB.push( { word: 'test', definition:'front to back test deffinition' } );          //
WOB.reverse();                                                                      //// clean this up.
WOB.pop();                                                                          //
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

$('body').on('click',  ".icon-volume-up", function () {
   $.getJSON("http://apifree.forvo.com/action/word-pronunciations/format/json/word/"+wordObject[0].word+"/order/rate-desc/limit/1/key/aad01d7956b025335a7b9d89ab0ef826/", function(jd) {
      var song =jd.items[0].pathmp3;
      var audioElement = document.createElement('audio');
 audioElement.setAttribute("preload", "auto");
 audioElement.autobuffer = true;
 var source1 = document.createElement('source');
 source1.type= 'audio/mp3';
 source1.src= song;
 audioElement.appendChild(source1);
 audioElement.load;
 audioElement.play();
    });
});

$("#hideButton").click(function() {
  $('.wordlist-container').toggle();
});

$("#reverseButton").click(function() {
  wordObject = wordObject.reverse();
  chrome.storage.sync.set({"myValue": wordObject}); //////// save
  window.location.reload();//// change this
  runArray;
});

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




$(document).ready(function(){  
$('#spellbox').focus();
$("#spellbox").keydown(function (e) {
    var c = String.fromCharCode(e.which);
    //console.log(c);
    //process the single character or
    var textValue = $("#spellbox").val();
    var fulltext = textValue + c;
    //process the full text
    var lowText = fulltext.toLowerCase();
    console.log(lowText);
    //console.log(wordObject[i].word.length);

    $("h3").empty();
    
    for ( var d = 0; d < wordObject[0].word.length; d=d+1 ){    
    
    $('h3').append("<h7>"+wordObject[0].word.substring(d, d+1)+"</h7>");
    }
    


    if (e.which === 8) {
      fulltext = textValue.substring(0, fulltext.length-2);
      console.log(fulltext);
      lowText = fulltext.toLowerCase();
              if (lowText=== wordObject[i].word.substring(0,lowText.length)) {
              $('h3 h7:nth-child(-n+'+lowText.length+')').css({backgroundColor: '#5bd642'});
            } else {
              $('h3 h7:nth-child('+lowText.length+')').animate({backgroundColor: '#e01432'});
              //runArray();
             // document.getElementById("spellbox").value = "";
           }



    }
    //nth-child(-n+2)
    if (lowText=== wordObject[i].word.substring(0,lowText.length)) {
      $('h3 h7:nth-child(-n+'+lowText.length+')').css({backgroundColor: '#5bd642'});
    } else {
      $('h3 > h7').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});
      //runArray();
     document.getElementById("spellbox").value = "";
     return false;


    }
    //document.getElementById("spellbox").value = "";

    if (e.which === 32 && lowText === wordObject[0].word+" "){
      console.log("spalde");
      //oneStep();
      runArray();
    }

        
                   
        
});





















/*  $('.wordlist-container').hide();  
  $('#spellbox').focus();
  $('#spellbox').keypress(function(e) {  

  //  console.log(e);

 var spell = document.getElementById('spellbox');   
    if(e.which == 32) { 
        var lastWord = spell.value.substring(spell.value.length-wordObject[i].word.length, spell.value.length);
       // console.log(lastWord);             
        if (lastWord===wordObject[i].word) {
            x=x+1;
            console.log(x);
            if (x%iterations===0) {
                oneStep();    //////////////// new oneStep method
                document.getElementById("spellbox").value = "";
            }
            $('h2').html(wordObject[i].word+"<i class=\"icon-volume-up\"></i>");
            //if (document.getElementById("check1").checked===true){
            //$('h2').html(wordObject[i].word+"<i class=\"icon-volume-up\"></i>");}
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});
            runArray();
           // document.getElementById("spellbox").value = document.getElementById("spellbox").value + wordObject[i].word;
            //$('.spellList').hide();
             } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});  // $(".class").animate({"background-color":"red"},40).animate({"background-color":"transparent"},40);
                    runArray(); 
                    if(x%iterations!==0)
                      {document.getElementById("spellbox").value = "";
                        x=0;

                      }else{
                        document.getElementById("spellbox").value = "";
                       // $('h2').text("Spell it again!");
                      }
                    


                    }



    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').html(5*wordObject[i].word+"<i class=\"icon-volume-up\"></i>"); 
        //if (document.getElementById("check1").checked===true){
        //$('h2').html(5*wordObject[i].word+"<i class=\"icon-volume-up\"></i>");}
    }




});
*/


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
  //this.children("li:nth-child(-n+2)");   no longer works now wikiDefine is a variable 
  $(" ol li ul").detach();
  $(" ol li ul").detach();
  var wikiDefine = this.textContent;
  var wikiDefineShort = jQuery.trim(wikiDefine).substring(0, 500)  /////// shorten the definition for google local storage
                          .trim(this) + "...";
    wordObject[wordObject.length]= { word: page, definition: wikiDefineShort };
    runArray();
    chrome.storage.sync.set({"myValue": wordObject}); /////save
  });
}
$(document).ready(function() {
  $('#pagetitle').hide();
  $('#word').change(function() {
    var page = this.value.toLowerCase(); /////////// maybe change this later
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
