
//var word = ["dog","cat","fish","frog","spider","bourgeois"];
var word = ["speaker","cat"];        
var i = 0;
var x = 0;
var iterations = 3;

var runArray = function (){
    $(".wordlist-table tbody").empty();

for ( var z = i; z < word.length; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+word[z]+"</td><td>...</td><td>"+"<i onclick=\"deleteLI(" + (z+1) + ")\" class=\"icon-remove\"></i>"+"</td></tr>" );

    }
 
for ( var z = 0; z < i; z=z+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+word[z]+"</td><td>...</td><td>"+"<i onclick=\"deleteLI(" + (z+1) + ")\" class=\"icon-remove\"></i>"+"</td></tr>" );

    }




};



var deleteLI = function (XX) {
        word.splice(XX-1, 1);
        runArray(); 
        
        };


var defineFunction = function (){                    ///////////////////////////////////// dictionary 
        $("div #define").text("define: "+word[i]);
};

defineFunction();


$(document).ready(function () {   
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



///////////////////

runArray();   
/////////////////////// <a class="btn" onClick="#"><i class=\"icon-remove\"></i></a> onclick=\"deleteLI()\"
$('#enterListButton').click(function(){
var spellItem = document.getElementById('listInput'); 
    word[word.length]=spellItem.value;
        console.log(word);
        document.getElementById("listInput").value = "";
        runArray();
        $('.spellList').show();
        $('h2').text(word[i]); 
});

$('#listInput').keypress(function(e) {
 var spellItem = document.getElementById('listInput');   ///////////////// same function as enterlistbutton


    if(e.which == 13) {
        
        word[word.length]=spellItem.value;
        console.log(word);
        document.getElementById("listInput").value = "";
        runArray();
        $('.spellList').show();
        $('h2').text(word[i]); 
        
                                    
    } 

});


});


$(document).ready(function(){   

    $('#showWordButton').click(function(){   // not sure if ill keep this just use the backspace method
        $('h2').text(word[i]);
             
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
            $('h2').text(word[i]);
                    
        }  else if (e.which == 8 && spell.value==="") {     //e.which == 8 not working (reveal word when backspace
            $('h2').text(word[i]);
                                     // empty #spellbox. Eventult make it reveal on backspace 
        }  else if (spell.value==="" && x%iterations!==0) {
            $('h2').text("Spell it again!");
            if (document.getElementById("check1").checked===true){
            $('h2').text(word[i]);}
        }  else {                                           // of last charactor.
            $('h2').empty(); 
            $('.wordlist-container').hide();    ///////////////////////////// toggle is causing an error where hide(); is not.
            
            if (document.getElementById("check1").checked===true) {
            $('h2').text(word[i]);}


        }   
        
    }, 0);
});
});

//////////////////////////////////////////////////////

$('h2').text(word[i]);


$('#spellbox').keypress(function(e) {   
 var spell = document.getElementById('spellbox');   
 defineFunction();
    if(e.which == 13) {
    	            	
    	if (spell.value===word[i]) {
    		
            x=x+1;
            
            if (x%iterations===0) {
                alert('press enter and continue to the next word');
                i = (i+1);
                if (word.length-1 < i) {          
                i=0;                    
                } 
            }

            $('h2').text(word[i]);
            if (document.getElementById("check1").checked===true){
            $('h2').text(word[i]);}
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});
            runArray(); 

			document.getElementById("spellbox").value = "";
			$('.spellList').hide();
			 } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});  // $(".class").animate({"background-color":"red"},40).animate({"background-color":"transparent"},40);
                    runArray(); 
                    }

    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').text(word[i]); 
        
        if (document.getElementById("check1").checked===true){
        $('h2').text(word[i]);}
    }


});


});
