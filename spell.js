
var word = ["dog","cat","fish","frog","spider","bourgeois"];
//var word = ["dog","cat"];
var lastEl = word.length-1;  // loop not working can delete
console.log(lastEl);         // console.log works
var i = 0;
var x = 0;
var factor = 0.5;


$(document).ready(function(){
    $('h4').mouseover(function(){   // not sure if ill keep this just use the backspace method
        $('h4').text(word[i]);      // needs fixing
    });
    

    $('h2').append(word[i]);



$(document).keypress(function(e) {
 var spell = document.getElementById('spellbox');   

    if(e.which == 13) {
    	
         
    	
    	if (spell.value===word[i]) {
    		
            x=x+factor;
            if (lastEl < i) {         // loop not working can delete  
                i=0;                    // loop not working can delete
            } 


            if (x%1===0) {
                i = (i+1);
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