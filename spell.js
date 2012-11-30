var word = ["dog","cat","fish","frog","spider","bourgeois"];

      
var i = 0;






$(document).ready(function(){

    $('p').append(word[i]);







$(document).keypress(function(e) {



    if(e.which == 13) {
    	var spell = document.getElementById('spellbox');
    	
    	if (spell.value===word[i]) {
    		i = i+1;
    		$('p').empty();
			$('p').append(word[i]);
            $('#spellbox').animate({backgroundColor: '#5bd642'}).delay(40).animate({backgroundColor: '#ffffff'});

			document.getElementById("spellbox").value = "";
			
			 } else {
                $('#spellbox').animate({backgroundColor: '#e01432'}).delay(40).animate({backgroundColor: '#ffffff'});}
    }



});


});


