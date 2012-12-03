
//var word = ["dog","cat","fish","frog","spider","bourgeois"];
var word = ["dog","cat"];        
var i = 0;
var x = 0;
var iterations = 1;





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

var deleteLI = function (XX) {
    alert (XX);
};


///////////////////
var runArray = function (){
$('.spellList').empty();   
for ( var z = 0; z < word.length; z=z+1 ){
    
    $('.spellList').append("<li></li>");
    $(".spellList li:nth-child(" + (z+1) + ")").append("<a class=\"btn btn-danger btn-block\" onclick=\"deleteLI(" + (z+1) + ")\">"+word[z]+""+" "+"<i class=\"icon-remove\"></i></a>" );

    }
}; 
runArray();   
/////////////////////// <a class="btn" onClick="#"><i class=\"icon-remove\"></i></a> onclick=\"deleteLI()\"
$('#listInput').keypress(function(e) {
 var spellItem = document.getElementById('listInput');   

    


    if(e.which == 13) {
        
        word[word.length]=spellItem.value;
        console.log(word);
        //$('.spellList').append("<li></li>");
        //$(".spellList li:nth-child(" + (word.length) + ")").append(word[word.length-1]+" "+"<i class=\"icon-remove\"></i>");
        document.getElementById("listInput").value = "";
        runArray();
        

                                    
    } 

});



$('.icon-remove').dblclick(function() {
    var litem = $j(this).remove();

    
    word.splice(1,2);
  });


$('#deleteID1').dblclick(function() {
  alert('Handler for .dblclick() called.');
  word.splice(1,2);
  runArray();
});






});


$(document).ready(function(){   

    $('h4').mouseover(function(){   // not sure if ill keep this just use the backspace method
        $('h4').text(word[i]);      // needs fixing
    });
    

    $('h2').append(word[i]);

//////////////////////////////////////////////////  detect empty textbox


var input = $('input'),
label = $('span');
$('#spellbox').keypress(function(e) {
    input.bind('keydown keypress', function() {
        setTimeout(function() {
        label.text(input.val());
        
        
        var spell = document.getElementById('spellbox');
        
        if (spell.value==="" && x%iterations===0) {             
            $('h2').text(word[i]);          
        }  else if (e.which == 8 && spell.value==="") {     //e.which == 8 not working (reveal word when backspace
            $('h2').text(word[i]);                          // empty #spellbox. Eventult make it reveal on backspace 
        }  else {                                           // of last charactor.
            $('h2').empty(); 
        }   
        
    }, 0);
});
});

//////////////////////////////////////////////////////


$('#spellbox').keypress(function(e) {   
 var spell = document.getElementById('spellbox');   

    if(e.which == 13) {
    	            	
    	if (spell.value===word[i]) {
    		
            x=x+1;
            
            if (x%iterations===0) {
                i = (i+1);
                if (word.length-1 < i) {          
                i=0;                    
                } 
            }

            $('h2').text(word[i]);
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});

			document.getElementById("spellbox").value = "";
			
			 } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});
                    }

    } else if (e.which == 8 && spell.value==="") {  //same here . e.which 8 not working
        $('h2').text(word[i]); 
    }


});


});

////////////////////////////////////////




