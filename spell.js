var i = 0;
var x = 0;
var iterations = 1;

var wordObject = [
{ word: 'read', definition:'Using Learn2Spell is easy. If, while browsing the web, you come across a word that you wish to drill into memory, highlight the word, right-click, and select \'Learn2Spell\'.' },
{ word: 'this', definition:'You can also add words manually with the input box above.' },
{ word: 'before', definition:'After your word is added to this list, it will automatically take a definition from Wiktionary. If you are not given a definition or are unhappy with the one given, double-click the definition text to add your own.' },
{ word: 'starting', definition:'After you have some words in the list that you wish to drill, start using the touch-typing area. Touch-typing is recommended for drilling words as it utilizes your muscle memory.' },
];

var wordObject1 = [
{ word: 'lsit1', definition:'1111111' }
];

var wordObject2 = [
{ word: 'lsit2', definition:'222222222222' }
];

var activeList = 0;

chrome.storage.sync.get("result1Value", //// load saved data. 
    function(res1) {
    if (res1.result1Value === undefined){
        
        console.log("nothin saved 1");
        
    } else {
    result1=res1.result1Value;
    $("#list1").html(result1);

    }   
  });




chrome.storage.sync.get("result2Value", //// load saved data. 
    function(res2) {
    if (res2.result2Value === undefined){
        
        console.log("nothin saved 2");
        
    } else {
    result2=res2.result2Value;
    $("#list2").html(result2);

    }   
  });



chrome.storage.sync.get("myValue1", //// load saved data. 
    function(val1) {
    if (val1.myValue1 === undefined){
        chrome.storage.sync.set({"myValue1": wordObject1});
        console.log("nothin saved 1");
        
    } else {
    wordObject1=val1.myValue1;

    }   
  });

chrome.storage.sync.get("myValue2", //// load saved data. 
    function(val2) {
    if (val2.myValue2 === undefined){
        chrome.storage.sync.set({"myValue2": wordObject2});
        console.log("nothin saved 2");
    } else {
    wordObject2=val2.myValue2;

    }   
  });



chrome.storage.sync.get("myValueAL", //// load saved active list data. 
  function(valAL) {
    if (valAL.myValueAL === undefined){
        return;
    } else {
    console.log(valAL.myValueAL);
    if (valAL.myValueAL===1){

    } else if (valAL.myValueAL===2){

  $('#list2').attr("disabled", true);
  $('#list2d').attr("disabled", true);
  $('#list1').attr("disabled", false);
  $('#list1d').attr("disabled", false);

    }
    }   
  });

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

var saveFunction = function(){
//  if () {}
};

var runArray = function (){
    if (wordObject.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').html(wordObject[i].word);
        };    
    $(".wordlist-table tbody").empty();
for ( var z = 0; z < wordObject.length; z=z+1 ){    
    $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "' class=\"icon-remove\"></i>"+" "+"<i sound-id='" +(z+1)+ "' class=\"icon-volume-up\"></i>"+"</td></tr>" );
    }
    chrome.storage.sync.set({"myValue": wordObject});///save
};

var deleteLI = function (XX) {
        wordObject.splice(XX-1, 1);
        runArray(); 
        if (wordObject.length <= 0){
        } else {
        $('h2').html(wordObject[i].word);
        }
        };

var editLI = function (TT){
bootbox.prompt("edit definition", function(defItem) {                
  if (defItem === null) {                                             
    return;                              
  } else {
    wordObject[TT-1]= { word: wordObject[TT-1].word, definition: defItem };
    chrome.storage.sync.set({"myValue": wordObject}); /////save
    runArray();                        
  }
});
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

$('body').on('click',  ".icon-volume-up", function (ev) {
  var clicked=$(ev.currentTarget);
   $.getJSON("http://apifree.forvo.com/action/word-pronunciations/format/json/word/"+wordObject[clicked.attr("sound-id")-1].word+"/order/rate-desc/limit/1/key/aad01d7956b025335a7b9d89ab0ef826/", function(jd) {
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

$("#createList").click(function() {
  prompt("Enter list name");
});

$("#list1").click(function() {
  $('#list1').attr("disabled", true);
  $('#list1d').attr("disabled", true);
  $('#list2').attr("disabled", false);
  $('#list2d').attr("disabled", false);
  activeList=1;
  chrome.storage.sync.set({"myValueAL": activeList}); //////// save AL
  
  wordObject2=wordObject;
  chrome.storage.sync.set({"myValue2": wordObject2}); //////// save
  
  wordObject=wordObject1;
  runArray();

});

$("#list2").click(function() {
  $('#list2').attr("disabled", true);
  $('#list2d').attr("disabled", true);
  $('#list1').attr("disabled", false);
  $('#list1d').attr("disabled", false);
  activeList=2;
  chrome.storage.sync.set({"myValueAL": activeList}); //////// save AL
  
  wordObject1=wordObject;
  chrome.storage.sync.set({"myValue1": wordObject1}); //////// save
  
  
  wordObject=wordObject2;
  runArray();

});

$('body').on('click',  "li", function (ev) {
  var clicked=$(ev.currentTarget);
  var editListNo = clicked.attr("edit-id");
  console.log(editListNo);
  if (editListNo==="1"){
      bootbox.prompt("Rename List 1", function(result1) {                
        if (result1 === null) {                                             
          return;                              
        } else {
          $("#list1").html(result1);
          chrome.storage.sync.set({"result1Value": result1}); //////// save                          
        }
      });
  } else if (editListNo==="2"){
      bootbox.prompt("Rename List 2", function(result2) {                
        if (result2 === null) {                                             
          return;                              
        } else {
          $("#list2").html(result2);
          chrome.storage.sync.set({"result2Value": result2}); //////// save                           
        }
      });
  } else if (editListNo==="1d") {
        bootbox.confirm("Are you sure you want to delete List 1?", function(result) {
            console.log("Confirm result: "+result);
    }); 
  } else if (editListNo==="2d") {
        bootbox.confirm("Are you sure you want to delete List 2?", function(result) {
           // $("#button2div").hide();
    }); 
  }
  
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

var input = $('#spellbox'),
label = $('#inputHiddenSpan');
$('#spellbox').keypress(function(e) {
    input.bind('keydown keypress', function() {
        setTimeout(function() {
        label.text(input.val());
        var spell = document.getElementById('spellbox');   
        if (spell.value==="" && x%iterations===0) {             
            $('h2').html(wordObject[i].word);
                    
        }  else if (e.which == 8 && spell.value==="") {     //e.which == 8 not working (reveal word when backspace
            $('h2').html(wordObject[i].word);
                                     // empty #spellbox. Eventult make it reveal on backspace 
        }  else if (spell.value==="" && x%iterations!==0) {
            $('h2').text("Spell it again!");
            if (document.getElementById("check1").checked===true){
            $('h2').html(wordObject[i].word);}
        }  else {                                           // of last charactor.
            $('h2').empty(); 
            if (document.getElementById("check1").checked===true) {
            $('h2').html(wordObject[i].word);}
        }    
    }, 0); 
});
});

$('#spellbox').keypress(function(e) {   
 var spell = document.getElementById('spellbox');   
    if(e.which == 13) {               
        if (spell.value===wordObject[i].word) {
            x=x+1;
            if (x%iterations===0) {
                oneStep();    //////////////// new oneStep method
            }
            $('h2').html(wordObject[i].word);
            if (document.getElementById("check1").checked===true){
            $('h2').html(wordObject[i].word);}
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});
            runArray();
            document.getElementById("spellbox").value = "";
            //$('.spellList').hide();
             } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});  // $(".class").animate({"background-color":"red"},40).animate({"background-color":"transparent"},40);
                    runArray(); 
                    document.getElementById("spellbox").value = "";
                    }
    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').html(wordObject[i].word); 
        if (document.getElementById("check1").checked===true){
        $('h2').html(wordObject[i].word);}
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
