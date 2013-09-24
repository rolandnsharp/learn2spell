

var today = new Date();
var i = 0;
var x = 0;
var iterations = 4;

var textValue = ""; 

var bodyPress = true;

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
{ word: 'lsit2', definition:'This is your second list. Use it for a second language you may be studying or for storing words you have already learnt. You can rename your lists with the option in the dropdown menu.  ' }
];

var activeList = 0;

var result1 = "List 1";

var result2 = "List 2";


chrome.storage.sync.get("CK1",
   function(res) {
    if (res.CK1==="true"){
    document.getElementById("check1").checked=true;
   } else {
    document.getElementById("check1").checked=false;
   }
  });

chrome.storage.sync.get("CK2",
   function(res) {
    if (res.CK2==="false"){
    document.getElementById("check2").checked=false;
   } else {
    document.getElementById("check2").checked=true;
   }
  });

chrome.storage.sync.get("CK3",
   function(res) {
    if (res.CK3==="true"){
    document.getElementById("check3").checked=true;
   } else {
    document.getElementById("check3").checked=false;
   }
  });

chrome.storage.sync.get("CK4",
   function(res) {
    if (res.CK4==="true"){
    document.getElementById("check4").checked=true;
   } else {
    document.getElementById("check4").checked=false;
   }
  });

chrome.storage.sync.get("result1Value", //// load saved data. 
    function(res1) {
    if (res1.result1Value === undefined){
        console.log("nothin saved 1");
    } else {
    result1=res1.result1Value;
    $("#list1").html(result1);
    chrome.extension.getBackgroundPage().clf1(result1,result2);
    }   
  });

chrome.storage.sync.get("result2Value", //// load saved data. 
    function(res2) {
    if (res2.result2Value === undefined){
        
        console.log("nothin saved 2");
        
    } else {
    result2=res2.result2Value;
    $("#list2").html(result2);
    chrome.extension.getBackgroundPage().clf1(result1,result2);
    }   
  });

chrome.storage.sync.get("myValueAL", //// load saved active list data. 
  function(valAL) {
    if (valAL.myValueAL === undefined){
        return;
    } else {
    if (valAL.myValueAL===1){
      activeList=1;
    } else if (valAL.myValueAL===2){
  activeList=2;   
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
   chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)});//
};

var loadFunction = function(){
    chrome.storage.sync.get("myValue", //// load saved data. 
    function(val) {
    if (val.myValue === undefined){
        chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)});
        loadBackgroundList();
        runArray();
    } else {
    wordObject=JSON.parse(val.myValue);
    runArray();
    loadBackgroundList();
    }   
  });

    chrome.storage.sync.get("myValue1", //// load saved data. 
    function(val1) {
    if (val1.myValue1 === undefined){
        chrome.storage.sync.set({"myValue1": JSON.stringify(wordObject1)});
        console.log("nothin saved 1");
    } else {
    wordObject1=JSON.parse(val1.myValue1);
    runArray();
    }   
  });

chrome.storage.sync.get("myValue2", //// load saved data. 
    function(val2) {
    if (val2.myValue2 === undefined){
        chrome.storage.sync.set({"myValue2": JSON.stringify(wordObject2)});
        console.log("nothin saved 2");
    } else {
    wordObject2= JSON.parse(val2.myValue2);
    runArray();
    }   
  });

 }; 

var runArray = function (){
var isActiveTableEmpty=true;

for ( var v = 0; v < wordObject.length; v=v+1 ){

  if (new Date(wordObject[0].date)>today){ 
  oneStep();
  }
}

    if (wordObject.length<=0) {
        $('h2').empty();
        
    } else {  
        $("h2").empty();
            for ( var d = 0; d < wordObject[0].word.length; d=d+1 ){    
            $('h2').append("<h7>"+wordObject[0].word.substring(d, d+1)+"</h7>");
           $('.scoreBox').html(wordObject[0].score);

            }
            $('h2 h7:nth-child('+(1)+')').css({ "border": "1px dotted black" });
        $("#defBoxBox").hide();
        $(".defBox h5").text("");
        if (document.getElementById("check2").checked===true){

          $(".defBox h5").text(wordObject[0].definition);        //////def box needs refining
          $("#defBoxBox").show();
        }
        };    
    $(".wordlist-table tbody").empty();
for ( var z = 0; z < wordObject.length; z=z+1 ){  
      
      if (new Date(wordObject[z].date)>today){

        if (document.getElementById("check4").checked===true){
        $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+jQuery.trim(new Date(wordObject[z].date)).substring(4, 10)+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "' class=\"icon-remove\"></i><i sound-id='" +(z+1)+ "' class=\"icon-volume-up\"></i></td></tr>" );
         $('.wordlist-table tbody tr:nth-child('+(z+1)+')').attr("class", "error");  
         }  
      }else{
            $(".wordlist-table tbody").append("<tr><td>"+wordObject[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObject[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "' class=\"icon-remove\"></i><i sound-id='" +(z+1)+ "' class=\"icon-volume-up\"></i></td></tr>" );
            isActiveTableEmpty=false;
           // $('.wordlist-table tbody tr:nth-child('+(z+1)+')').attr("class", "success");   
          }
  }
    
  //  chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)});///save

  if (isActiveTableEmpty===true){
    $("#defBoxBox").hide();
    $(".defBox h5").empty();
    $("h2").empty();
    $('.wordlist-container').show();
  }
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
bodyPress = false;
bootbox.prompt("edit definition", function(defItem) {           
  if (defItem === null) {   
    bodyPress = true; 
    textValue = "";
    return;                              
  } else {
    wordObject[TT-1]= { word: wordObject[TT-1].word, definition: defItem };
    chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
    runArray();
    bodyPress = true; 
    textValue = "";
                         
  }
});
};

var loadBackgroundList = function (){

if (activeList===1){
  var WOB = chrome.extension.getBackgroundPage().wordObjectB;
} else if (activeList===2) {
  var WOB = chrome.extension.getBackgroundPage().wordObjectB2;
} else {
  var WOB = chrome.extension.getBackgroundPage().wordObjectB;
}
WOB.push( { word: 'test', definition:'front to back test deffinition' } );          //
WOB.reverse();                                                                      //// clean this up later.
WOB.pop();                                                                          //
while (WOB.length > 1)
  {
  wordObject[wordObject.length]= WOB[WOB.length-1];
  WOB.splice(WOB.length-1);
  }
runArray();
chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)});///save

if (activeList===1){
  chrome.extension.getBackgroundPage().wordObjectB=[ { word: 'test', definition:'front to back test deffinition' } ];
} else if (activeList===2) {
  chrome.extension.getBackgroundPage().wordObjectB2=[ { word: 'test 2', definition:'front to back test deffinition 2' } ];
}

chrome.extension.getBackgroundPage().runArrayB();
runArray();
};

$(document).ready(function () {   
loadFunction(); 
//$('.optionsBox').hide();

$("#check1").change(function() {
    if(this.checked) {
           chrome.storage.sync.set({"CK1": "true"});///save
    } else if (this.checked!==true){
            chrome.storage.sync.set({"CK1": "false"});///save
    }
});

$("#check2").change(function() {
    if(this.checked) {
           chrome.storage.sync.set({"CK2": "true"});///save
            $("#defBoxBox").show();
            $(".defBox h5").text(wordObject[0].definition);
    } else if (this.checked!==true){
            chrome.storage.sync.set({"CK2": "false"});///save
            $(".defBox h5").text("");
            $("#defBoxBox").hide();
            
    }
});

$("#check3").change(function() {
    if(this.checked) {
           chrome.storage.sync.set({"CK3": "true"});///save
           console.log("true");
    } else if (this.checked!==true){
            chrome.storage.sync.set({"CK3": "false"});///save
            console.log("false");
    }
});

$("#check4").change(function() {
    if(this.checked) {
           chrome.storage.sync.set({"CK4": "true"});///save
           runArray();
           $('.wordlist-container').show();
    } else if (this.checked!==true){
            chrome.storage.sync.set({"CK4": "false"});///save
            runArray();
    }
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

$("#optionsButton").click(function() {
   $('#optionsModal').modal('show');
   bodyPress = false;
   $('#optionsModal').on('hidden', function () {
      
      bodyPress = true;
      runArray();

  })
  runArray();
});

$("#hideButton").click(function() {
  $('.wordlist-container').toggle();

});

$("#list1").click(function() {
  
  $('#list1').attr("disabled", true);
  $('#list1d').attr("disabled", true);
  $('#list2').attr("disabled", false);
  $('#list2d').attr("disabled", false);
  activeList=1;
  
  chrome.storage.sync.set({"myValueAL": activeList}); //////// save AL
  
  wordObject2=wordObject;
  chrome.storage.sync.set({"myValue2": JSON.stringify(wordObject2)}); //////// save
  
  wordObject=wordObject1;
  loadBackgroundList();
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
  chrome.storage.sync.set({"myValue1": JSON.stringify(wordObject1)}); //////// save

  wordObject=wordObject2;
  loadBackgroundList();
  runArray();

});

$('body').on('click',  "li", function (ev) {
  var clicked=$(ev.currentTarget);
  var editListNo = clicked.attr("edit-id");
  console.log(editListNo);
  if (editListNo==="1"){
      bodyPress = false; 
      bootbox.prompt("Rename List 1", function(r1) {                
        if (r1 === null) {  
          bodyPress = true; 
          textValue = "";                                           
          return;                              
        } else {
          $("#list1").html(r1);
          result1=r1;
          chrome.storage.sync.set({"result1Value": result1}); //////// save  
          chrome.extension.getBackgroundPage().clf1(r1,result2);
          bodyPress = true; 
          textValue = "";                       
        }
      });
  } else if (editListNo==="2"){
      bodyPress = false; 
      bootbox.prompt("Rename List 2", function(r2) {                
        if (r2 === null) {   
          bodyPress = true; 
          textValue = "";                                           
          return;                              
        } else {
          $("#list2").html(r2);
          result2=r2;
          chrome.storage.sync.set({"result2Value": result2}); //////// save 
          chrome.extension.getBackgroundPage().clf1(result1,r2); 
          bodyPress = true; 
          textValue = "";                        
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

/*
$('body').on('click',  ".icon-arrow-right", function (ev) {   /// transfer word between list button
    var clicked=$(ev.currentTarget);
    var transID = clicked.attr("trans-id");
    if (activeList===1) {
    wordObject2[wordObject2.length]=wordObject[transID-1];
    deleteLI(clicked.attr("trans-id")); 
    chrome.storage.sync.set({"myValue2": wordObject2}); //////// save

    } else if (activeList===2){
    wordObject1[wordObject1.length]=wordObject[transID-1];
    deleteLI(clicked.attr("trans-id")); 
    chrome.storage.sync.set({"myValue1": wordObject1}); //////// save

  }
  runArray();  
  chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); //////// save///////////////////////////////
});
*/
$('body').on('click',  ".icon-remove", function (ev) {
    var clicked=$(ev.currentTarget);
  deleteLI(clicked.attr("data-id"));
  runArray();  
  chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); //////// save
});

$('body').on('dblclick',  "td", function (ev) {
    var clicked=$(ev.currentTarget);
   
    editLI(clicked.attr("data-id"));
    runArray();  
  chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); //////// save

});


$('body').on('dblclick',  ".defBox", function () {
bodyPress = false; 
bootbox.prompt("edit definition", function(defItem) {                
  if (defItem === null) { 
    bodyPress = true; 
    textValue = "";                                             
    return;                              
  } else {
    wordObject[0]= { word: wordObject[0].word, definition: defItem };
    chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
    runArray();    
    bodyPress = true; 
    textValue = "";                      
  }
});
}); 

    $("#button1").click(function() {
    oneStep();
    runArray();
    $('#myModal').modal('hide');
    return;
   });

   $("#button2").click(function() {
    var myDate=new Date();
    myDate.setDate(myDate.getDate()+7);
    wordObject[0].date= myDate;
    chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
    runArray();
    $('#myModal').modal('hide');
    return;
   });

   $("#button3").click(function() {
    var myDate=new Date();
    myDate.setDate(myDate.getDate()+30);
    wordObject[0].date= myDate;
    chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
    runArray();
    $('#myModal').modal('hide');
    return;
   });

   $("#button4").click(function() {
    wordObject.shift();
    runArray();
    $('#myModal').modal('hide');
    return;
   }); 

});
$(document).ready(function() {
$(document).keypress(function (e) {   /// need keypress for french characters . backspace needs fixing
  if(bodyPress===true){
    $('.wordlist-container').hide();



    var c = String.fromCharCode(e.which);
    textValue=textValue+c;
    var fulltext = textValue;
    var lowText = fulltext.toLowerCase();

    $("h2").empty();
    
    for ( var d = 0; d < wordObject[0].word.length; d=d+1 ){    
    
    $('h2').append("<h7>"+wordObject[0].word.substring(d, d+1)+"</h7>");
    }
    
    $('h2 h7:nth-child('+(lowText.length+1)+')').css({ "border": "1px dotted black" });
    
   /* if (e.which === 8) {
      
      console.log("fulltext");

      fulltext = textValue.substring(0, fulltext.length-2);

      console.log(fulltext);
      lowText = fulltext.toLowerCase();
              if (lowText=== wordObject[i].word.substring(0,lowText.length)) {
              $('h2 h7:nth-child(-n+'+lowText.length+')').css({backgroundColor: '#5bd642'});

            } else {
              $('h2 h7:nth-child('+lowText.length+')').animate({backgroundColor: '#e01432'});   /// can probably delete this 
              //runArray();
             // document.getElementById("spellbox").value = "";
           }
    }*/

    if (lowText=== wordObject[i].word.substring(0,lowText.length)) {
      $('h2 h7:nth-child(-n+'+lowText.length+')').css({backgroundColor: '#5bd642'});
     
      if (document.getElementById("check1").checked!==true){
      $('h2 h7:nth-child(n+'+(lowText.length+1)+')').css({color: 'white'}); ////////////////////////////////// show word while typing. 
      }

    } 

    else if (e.which === 32 && lowText === wordObject[0].word+" "){
      //console.log("spalde");
      $('h2 h7:nth-child('+(1)+')').css({ "border": "1px dotted black" });
      textValue = "";
          
          if (wordObject[0].score===undefined){
          wordObject[0].score= 1;
          //$('.scoreBox').html("<h1>"+wordObject[0].score+"<h1>");
          return;
          } else {
            wordObject[0].score= wordObject[0].score + 1;
           // $('.scoreBox').html("<h1>"+wordObject[0].score+"<h1>");

            if (wordObject[0].score>=iterations){
              wordObject[0].score= 0;
              $('.scoreBox').html(iterations);
              $('#myModal').modal('show');
              $('#myModal').on('shown', function () {
                $('#pWord').text(wordObject[0].word).css('font-weight', 'bold');
                bodyPress = false;
              })
              $('#myModal').on('hide', function () {

                bodyPress = true;
              })
              
              return;
              


            }
          }
          
     //return false;
    // oneStep(); when blanked space repeats word
     //runArray();
     $('.scoreBox').html(wordObject[0].score);
     return false;
    } 
    
    else if (e.which === 13 && lowText.substring(0,lowText.length-1) === wordObject[0].word){
     //return false;
     textValue = "";
              if (wordObject[0].score===undefined){
          wordObject[0].score= 1;
         // $('.scoreBox').html("<h1>"+wordObject[0].score+"<h1>");
          //return;
          } else {
            wordObject[0].score= wordObject[0].score + 1;
        //    $('.scoreBox').html("<h1>"+wordObject[0].score+"<h1>");

            if (wordObject[0].score>=iterations){
              wordObject[0].score= 0;
              $('.scoreBox').html(iterations);
              $('#myModal').modal('show');
              $('#myModal').on('shown', function () {
                $('#pWord').text(wordObject[0].word).css('font-weight', 'bold');
                bodyPress = false;
              })
              $('#myModal').on('hide', function () {

                bodyPress = true;
                
              })
              return;
              
              
            }
          }

     oneStep();
     
     if (document.getElementById("check3").checked===true){ 
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
     }      
     runArray();
     return;
    } else if (e.which === 8){
      console.log("kjfdkslfj");
    }

    else {
      $('h2 > h7').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});
      //$("h2").empty();   ///// causing problem
      //runArray();

      wordObject[0].score= 0;
     $('.scoreBox').html(wordObject[0].score);
     
     $('h2 h7:nth-child(n+'+(1)+')').css({"border": "0px solid white" });  // clear existing borders
     $('h2 h7:nth-child('+(1)+')').css({ "border": "1px dotted black" });
     textValue = "";
     return false;
    }
    } 

    else if(bodyPress===false){
  

   if (e.which === 49){
      console.log("one");
      $('#button1').click();
      bodyPress = true;
      return;
    }
    if (e.which === 50){
      console.log("two");
      $('#button2').click();
      bodyPress = true;
      return;
    }
    if (e.which === 51){
      console.log("three");
      $('#button3').click();
      bodyPress = true;
     return;
    }
    if (e.which === 52){
      console.log("four");
      $('#button4').click();
      bodyPress = true;
     return;
    }
  }
});


/*  

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
});*/

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
    chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
  });
}
//$('#word').css({backgroundColor: 'gray'});
   //  $('#word').css({ "border": "1px solid black" });
    //  $('#word').css({ "color": "black" });
//$(document).ready(function() {
  $('#pagetitle').hide();
    $('input[type="text"]').focus(function() { //if input is focused
     bodyPress = false; 
     //$('#word').css({backgroundColor: 'white'});
    });

     $('input[type="text"]').blur(function() { //if input is blured
     bodyPress = true; 
    // $('#word').css({backgroundColor: 'gray'});
    // $('#word').css({ "border": "1px solid black" });
     
    });


  $('#word').change(function() {
    var page = this.value.toLowerCase(); /////////// maybe change this later
    document.getElementById("word").value = "";
    $('#word').attr("placeholder","loading...");
    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
    function(json) {
                                          $('#loading').html('');
                                          console.log(json.parse);
                                          if(json.parse === undefined) {
                                            console.log("word not found");
                                            wordObject[wordObject.length]= { word: page, definition: "word not found - double click here to add definition" };
                                              runArray();
                                              chrome.storage.sync.set({"myValue": JSON.stringify(wordObject)}); /////save
                                              document.getElementById("word").value = "";
                                              $('#word').attr("placeholder","Add word - Press Enter");
                                           //   bodyPress = true; ///////////////////////////////find better way to return to h2
                                              textValue = "";
                                            //  $('#word').blur();
                                          } else {
                                            showPage(page,json.parse.text['*']);
                                            $('#wikiInfo').html("<div></div>");
                                            document.getElementById("word").value = "";
                                            $('#word').attr("placeholder","Add word - Press Enter");
                                            //bodyPress = true; 
                                            textValue = "";
                                           // $('#word').blur();
                                          }
    });
  });
});

