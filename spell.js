
var word = ["dog","cat","fish","frog","spider","bourgeois"];
//var word = ["dog","cat"];
var lastEl = word.length-1;          
var i = 0;
var x = 0;
var factor = 0.5;

$(document).ready(function(){
    $('h4').mouseover(function(){   // not sure if ill keep this just use the backspace method
        $('h4').text(word[i]);      // needs fixing
    });
    

    $('h2').append(word[i]);

//////////////////////////////////////////////////  detect empty textbox


        var input = $('input'),
        label = $('span');
$(document).keypress(function(e) {
    input.bind('keydown keypress', function() {
    setTimeout(function() {
        label.text(input.val());
        
        
        var spell = document.getElementById('spellbox');
        
        if (spell.value==="" && x%1===0) {             
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


$(document).keypress(function(e) {
 var spell = document.getElementById('spellbox');   

    if(e.which == 13) {
    	
         
    	
    	if (spell.value===word[i]) {
    		
            x=x+factor;
            


            if (x%1===0) {
                i = (i+1);
                if (lastEl < i) {          
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