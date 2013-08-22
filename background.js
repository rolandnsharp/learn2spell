



var i = 0;
var x = 0;
var iterations = 1;

var wordObjectB = [
    { word: 'peanut', definition:'The oval seed of a South American plant, eaten as a snack or used for making oil or animal feed.' }
  
];

var loadFunction = function(){
    //chrome.storage.sync.set({"myValueB": wordObjectB}); activate this to get the program running. The emply storage will throw an error 
    chrome.storage.sync.get("myValueB", //// load saved data. 
    function(val) {
    if (val.myValueB === undefined){
        chrome.storage.sync.set({"myValueB": wordObjectB});
        runArrayB();
    } else {
    wordObjectB=val.myValueB;
    runArrayB();
    }   
    
  });
 }; 
loadFunction();

var loadBackgroundList = function (){
var WOB = chrome.extension.getBackgroundPage().wordObjectB;
console.log(WOB);


while (WOB.length > 1)
  {
  wordObjectB[wordObjectB.length]= WOB[WOB.length-1];
  WOB.splice(WOB.length-1);
  }

//wordObjectB[wordObjectB.length]= WOB[WOB.length-1];
console.log(wordObjectB);

runArrayB();
chrome.storage.sync.set({"myValueB": wordObjectB});///save
chrome.extension.getBackgroundPage().wordObjectB=[
    { word: 'test', definition:'test deffinition' } ];
 //chrome.extension.getBackgroundPage().runArrayBB();
 // var selection = chrome.extension.getBackgroundPage().wordObjectB;
 //console.log(selection);

};





var runArrayB = function (){
 

    if (wordObjectB.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObjectB[i].word);
        };
    
    $(".wordlist-table tbody").empty();


for ( var z = i; z < wordObjectB.length; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObjectB[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();

    }
 
for ( var z = 0; z < i; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObjectB[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();
    
    }


};



var deleteLI = function (XX) {
        wordObjectB.splice(XX-1, 1);
        runArrayB(); 
        if (wordObjectB.length <= 0){

        } else {
        $('h2').text(wordObjectB[i].word);
        }
        };


var editLI = function (TT){
var defItem = prompt("edit definition");
    console.log(defItem);
    console.log(TT);
    wordObjectB[TT-1]= { word: wordObjectB[TT-1].word, definition: defItem };
    chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
        /////////////////////////////////////////////////////
        
        runArrayB();

};

/*
var defineFunction = function (){                    ///////////////////////////////////// dictionary 
        $("#defTextArea").html(wordObjectB[i].definition.innerHTML);
};

defineFunction();

*/




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


//defineFunction();

/////////////////////////////////////// hide show list
$("#hideButton").click(function() {
  $('.wordlist-container').toggle();
console.log(wordObjectB);
runArrayB();
      ///////////////////////////// toggle is causing an error where hide(); is not.
});

$("#refreshButton").click(function() {
 
  loadBackgroundList();
});

/*var isActive;

window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
}; 

// test
setInterval(function () { 
    loadBackgroundList();

  console.log(window.isActive ? 'active' : 'inactive'); 
}, 1000);

*/

runArrayB();  



$('body').on('click',  ".icon-remove", function (ev) {
    var clicked=$(ev.currentTarget);
  deleteLI(clicked.attr("data-id"));
  runArrayB();  
  chrome.storage.sync.set({"myValueB": wordObjectB}); //////// save
});

$('body').on('dblclick',  "td", function (ev) {
    var clicked=$(ev.currentTarget);
    editLI(clicked.attr("data-id"));
    runArrayB();  
  chrome.storage.sync.set({"myValueB": wordObjectB}); //////// save
});



/////////////////////// <a class="btn" onClick="#"><i class=\"icon-remove\"></i></a> onclick=\"deleteLI()\"
$('#enterListButton').click(function(){

var spellItem = document.getElementById('listInput'); 
    wordObjectB[wordObjectB.length]= { word: spellItem.value, definition: "...definition..." };
        console.log(wordObjectB);///////////////////////////////////////////////////////

        document.getElementById("listInput").value = "";
        runArrayB();

        $('.spellList').show();
        $('h2').text(wordObjectB[i].word); 
        chrome.storage.sync.set({"myValueB": wordObjectB}); //////// save
});

$('#listInput').keypress(function(e) {
 var spellItem = document.getElementById('listInput');   ///////////////// same function as enterlistbutton


    if(e.which == 13) {
        
        wordObjectB[wordObjectB.length]= { word: spellItem.value, definition: "...definition..." };
        console.log(wordObjectB);
        document.getElementById("listInput").value = "";
        runArrayB();
        $('.spellList').show();
        $('h2').text(wordObjectB[i].word); 
        chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                    
    } 

});


});


$(document).ready(function(){   

    $('#showWordButton').click(function(){   // not sure if ill keep this just use the backspace method
        $('h2').text(wordObjectB[length-1].word);
        runArrayB();
             
    });
    $('#spellbox').focus();

//////////////////////////////////////////////////  detect empty textbox


var input = $('#spellbox'),
label = $('#inputHiddenSpan');
$('#spellbox').keypress(function(e) {
    input.bind('keydown keypress', function() {
        setTimeout(function() {
        label.text(input.val());
        
        var spell = document.getElementById('spellbox');
        
        if (spell.value==="" && x%iterations===0) {             
            $('h2').text(wordObjectB[i].word);
                    
        }  else if (e.which == 8 && spell.value==="") {     //e.which == 8 not working (reveal word when backspace
            $('h2').text(wordObjectB[i].word);
                                     // empty #spellbox. Eventult make it reveal on backspace 
        }  else if (spell.value==="" && x%iterations!==0) {
            $('h2').text("Spell it again!");
            if (document.getElementById("check1").checked===true){
            $('h2').text(wordObjectB[i].word);}
        }  else {                                           // of last charactor.
            $('h2').empty(); 
            //$('.wordlist-container').hide();    ///////////////////////////// toggle is causing an error where hide(); is not.
            
            if (document.getElementById("check1").checked===true) {
            $('h2').text(wordObjectB[i].word);}

        }   
        
    }, 0);
});
});

//////////////////////////////////////////////////////

$('#spellbox').keypress(function(e) {   
 var spell = document.getElementById('spellbox');   
 //defineFunction();
    if(e.which == 13) {
                        
        if (spell.value===wordObjectB[i].word) {
            
            x=x+1;
            
            if (x%iterations===0) {
                //alert('press enter and continue to the next word');///////////////////////// alert off
                i = (i+1);
                
                if (wordObjectB.length <= i) {          
                i=0;    
                //defineFunction();                
                } 
            }

            $('h2').text(wordObjectB[i].word);
            if (document.getElementById("check1").checked===true){
            $('h2').text(wordObjectB[i].word);}
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});
            runArrayB(); 

            document.getElementById("spellbox").value = "";
            //$('.spellList').hide();
             } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});  // $(".class").animate({"background-color":"red"},40).animate({"background-color":"transparent"},40);
                    runArrayB(); 
                    }

    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').text(wordObjectB[i].word); 
        
        if (document.getElementById("check1").checked===true){
        $('h2').text(wordObjectB[i].word);}
    }


});


});



/*var baseURL = 'http://en.wiktionary.org';
function showPage(page,text) {
  var sourceurl = baseURL + '/wiki/' + page;
  $('#pagetitle').text(page);
  $('#wikiInfo').html(text);
  $('#sourceurl').attr('href',sourceurl);
  $('#licenseinfo').show();
  $('.audiofile').hide();
  $('.toc').hide();
  $('.NavContent').hide();
  $('#Pronunciation').hide();

  $('.thumbinner').hide();
  $('.references').hide();
  // now you can modify content of #wikiInfo as you like


$('#wikiInfo').children("ol:lt(2)").appendTo('#WInfo');

$("#WInfo ol li ul").detach();
$("#WInfo ol li dl").detach();

$("#WInfo").find("ol li:nth-child(-n+2)").appendTo('#WInfo2 ol');
//$('#WInfo2 ol').replaceWith().find("#WInfo ol li:nth-child(-n+2)");


}
$(document).ready(function() {
  $('#pagetitle').hide();
  $('#word').change(function() {


    var spellItem = document.getElementById('word'); 

    var defineItem = document.getElementById('WInfo2');
   
    $("#WInfo2").html(defineItem);
   var defineItem2 = document.getElementById('WInfo2');

     wordObjectB[wordObjectB.length]= { word: spellItem.value, definition: defineItem };
     console.log(defineItem2);



     console.log(wordObjectB);
     runArrayB();
     
     chrome.storage.sync.set({"myValueB": wordObjectB}); //////// save  
        

        $('.spellList').show();
        $('h2').text(wordObjectB[i].word); 
        
        
        

    var page = this.value;
    $('#wikiInfo').html('...please wait...');
   runArrayB();
   $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
    function(json) {
        
      if(json.parse.revid > 0) {
        showPage(page,json.parse.text['*']);
      } else {
        $('#wikiInfo').html('word not found');
        $('#licenseinfo').hide();
      }
    });

  });
  
});

*/
var baseURL = 'http://en.wiktionary.org';
function showPage(page,text) {
  var sourceurl = baseURL + '/wiki/' + page;
  $('#pagetitle').text(page);
 // console.log(page);
  $('#wikiInfo').html(text);
  $('#sourceurl').attr('href',sourceurl);
  $('#licenseinfo').show();
 

   $('#wikiInfo').children("ol:lt(1)").attr('',   ////////////////////////////////// change number of drfinitions eg verb and noun
    function() { //console.log(this);
      //this.children("li:nth-child(-n+2)");
  $(" ol li ul").detach();
  $(" ol li ul").detach();
var wikiDefine = this.textContent;
     // console.log(wikiDefine);
//var title = "This is your title";
var wikiDefineShort = jQuery.trim(wikiDefine).substring(0, 400)  /////// shortening the definition for google local storage
                          .trim(this) + "...";
  //var spellItem = document.getElementById('word'); 
    
  //console.log(spellItem.value);
    runArrayB();  
    wordObjectB[wordObjectB.length]= { word: page, definition: wikiDefineShort };
    //console.log(wordObjectB);
    runArrayB();
    chrome.storage.sync.set({"myValueB": wordObjectB}); /////save


      //$(" ol li ul").detach();
     // $(" ol li ul").detach();
     // console.log(this);
//$("#WInfo ol li dl").detach();
//$("#WInfo ol li dl").detach();
  });

}
$(document).ready(function() {
  $('#pagetitle').hide();
  $('#word').change(function() {


    var page = this.value;
    $('#wikiInfo').html('...please wait...');
    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
    function(json) {
      if(json.parse.revid > 0) {
        showPage(page,json.parse.text['*']);
      } else {
        $('#wikiInfo').html('word not found');
        $('#licenseinfo').hide();
      }
    });
  });
});



chrome.contextMenus.removeAll();
chrome.contextMenus.create({title: "Learn 2 Spell '%s' ", 
                             contexts:["selection"], 
                              onclick: function(info){ 
                             //   wordObjectB[wordObjectB.length] = { word: info.selectionText /*, definition: " 'add definition' " */};
                                //var page = info.selectionText;
                               
                               
                                //console.log(wordObjectB);
                              //  runArrayB();
                               // chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                   

                         //   wordObjectB[wordObjectB.length]= { word: info.selectionText, definition: wikiDefine };
                                    //////////////////////////////////////////////

                                    runArrayB(); 
                                    console.log(wordObjectB); 
                                    //////////////////////////////////////////////////////

                                    var page = info.selectionText;
                                    $('#wikiInfo').html('...please wait...');
                                    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
                                    function(json) {
                                      if(json.parse.revid > 0) {
                                        showPage(page,json.parse.text['*']);
                                      } else {
                                        $('#wikiInfo').html('word not found');
                                        $('#licenseinfo').hide();

                                      }
                                    });
                                  



                                 }
});