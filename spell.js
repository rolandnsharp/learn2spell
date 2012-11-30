var word = ["dog","cat","fish","frog","spider","bourgeois"];

      
var i = 0;


$(document).ready(function(){


			$('p').append(word[i]);

$(document).keypress(function(e) {

    if(e.which == 13) {
    	var spell = document.getElementById('spellbox');
    	console.log(spell.value);
    	if (spell.value===word[i]) {
    		i = i+1;
    		$('p').empty();
			$('p').append(word[i]);
			document.getElementById("spellbox").value = "";
			
			 }
    }
});











});



