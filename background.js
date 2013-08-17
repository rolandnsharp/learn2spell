
var i = 0;
var x = 0;
var iterations = 1;

var wordObjectB = [
    { word: 'test', definition:'test definition' }
    
];

/*var loadFunction = function(){
    //chrome.storage.sync.set({"myValue": wordObjectB}); activate this to get the program running. The emply storage will throw an error 
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
loadFunction();*/
////////////////right click menu
var backSelect = "empty"

chrome.contextMenus.removeAll();
chrome.contextMenus.create({title: "Learn 2 Spell '%s' ", 
                             contexts:["selection"], 
                              onclick: function(info){ 
                                wordObjectB[wordObjectB.length] = { word: info.selectionText, definition: " 'add definition' " };
                                console.log(wordObjectB);
                                ///chrome.extension.getViews = function() { console.log("hello");};
                               // var view = chrome.extension.getViews({"type":"tab", "windowId": tab.windowId));
                               // console.log(view);

                               // var tabs = chrome.extension.getViews({type: "tab"});
                               // tabs[0].backToFront();                                        sending function. 
                               
                               
                                //chrome.storage.sync.set({"myValueB": wordObjectB});
                               // console.log(wordObjectB);
                                //chrome.contextMenus.removeAll();
                                //location.reload(); /////////// refreshes page ! probably not good
                                 }
});

///////////////

/*var runArrayB = function (){
    if (wordObjectB.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObjectB[i].word);
        };
    
    $(".wordlist-table tbody").empty();


for ( var z = i; z < wordObjectB.length; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObjectB[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    defineFunction();
    }
 
for ( var z = 0; z < i; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[z].word+"</td><td data-id='" + (z+1) + "'>"+wordObjectB[z].definition+"</td><td>"+"<i id=\"deleteLI" + (z+1) + "\" data-id='" + (z+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    defineFunction();
    
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


var defineFunction = function (){                    ///////////////////////////////////// dictionary 
        $("#defTextArea").text(wordObjectB[i].definition);
};

defineFunction();



$(document).ready(function () {   
    




//loadFunction();





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


defineFunction();

/////////////////////////////////////// hide show list
$("#hideButton").click(function() {
  $('.wordlist-container').toggle();    ///////////////////////////// toggle is causing an error where hide(); is not.
});



runArrayB();  



$('body').on('click',  ".icon-remove", function (ev) {
    var clicked=$(ev.currentTarget);
  deleteLI(clicked.attr("data-id"));
  chrome.storage.sync.set({"myValueB": wordObjectB}); //////// save
});

$('body').on('dblclick',  "td", function (ev) {
    var clicked=$(ev.currentTarget);
    editLI(clicked.attr("data-id"));
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
        $('h2').text(wordObjectB[i].word);
             
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
 defineFunction();
    if(e.which == 13) {
                        
        if (spell.value===wordObjectB[i].word) {
            
            x=x+1;
            
            if (x%iterations===0) {
                //alert('press enter and continue to the next word');///////////////////////// alert off
                i = (i+1);
                
                if (wordObjectB.length <= i) {          
                i=0;    
                defineFunction();                
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
*/