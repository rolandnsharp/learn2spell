



var ib = 0;
var xb = 0;


var wordObjectB = [
    { word: 'test word', definition:'this word is used for back testing' }
  
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

var runArrayB = function (){
 

    if (wordObjectB.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObjectB[ib].word);
        };
    
    $(".wordlist-table tbody").empty();


for ( var zb = ib; zb < wordObjectB.length; zb=zb+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[zb].word+"</td><td data-id='" + (zb+1) + "'>"+wordObjectB[zb].definition+"</td><td>"+"<i id=\"deleteLI" + (zb+1) + "\" data-id='" + (zb+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();

    }
 
for ( var zb = 0; zb < ib; zb=zb+1 ){

    
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[zb].word+"</td><td data-id='" + (zb+1) + "'>"+wordObjectB[zb].definition+"</td><td>"+"<i id=\"deleteLI" + (zb+1) + "\" data-id='" + (zb+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    //defineFunction();
    
    }
chrome.storage.sync.set({"myValueB": wordObjectB});///save

};


runArrayB();



var baseURL = 'http://en.wiktionary.org';
function showPage(page,text) {
  var sourceurl = baseURL + '/wiki/' + page;
  $('#pagetitle').text(page);
 // console.log(page);
  $('#wikiInfoB').html(text);
  $('#sourceurl').attr('href',sourceurl);
  $('#licenseinfo').show();
 

   $('#wikiInfoB').children("ol:lt(1)").attr('',   ////////////////////////////////// change number of drfinitions eg verb and noun
    function() { //console.log(this);
      //this.children("li:nth-child(-n+2)");
  $(" ol li ul").detach();
  $(" ol li ul").detach();
var wikiDefine = this.textContent;
     // console.log(wikiDefine);
//var title = "This is your title";
var wikiDefineShort = jQuery.trim(wikiDefine).substring(0, 500)  /////// shortening the definition for google local storage
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
    $('#wikiInfoB').html('...please wait...');
    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
    function(json) {
      if(json.parse.revid > 0) {
        showPage(page,json.parse.text['*']);
        $('#wikiInfoB').replaceWith("");
      } else {
        $('#wikiInfoB').html('word not found');
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

                                    var page = info.selectionText.toLowerCase();
                                    $('#wikiInfoB').html('...please wait...');
                                    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
                                    function(json) {
                                      console.log(json.parse);
                                      if(json.parse === undefined) {

                                        console.log("word not found");
                                        wordObjectB[wordObjectB.length]= { word: info.selectionText, definition: "word not found - double click here to add definition" };
                                          //console.log(wordObjectB);
                                          runArrayB();
                                          chrome.storage.sync.set({"myValueB": wordObjectB}); /////save

                                        
                                      } else {
                                        showPage(page,json.parse.text['*']);
                                        $('#wikiInfoB').replaceWith("");
                                        runArrayB();
                                          chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                      }
                                      
                                      var tabs = chrome.extension.getViews({type: "tab"});
                                      if (tabs[0]===undefined){
                                        
                                        console.log("not on front page");
                                      }else{
                                        tabs[0].loadBackgroundList();
                                      }

                                      
                                     // 
                                    });
                                  


                                  
                            


                                 }
});

