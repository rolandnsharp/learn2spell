

var ib = 0;
var xb = 0;

var wordObjectB = [{ word: 'test word', definition:'this word is used for back testing' }];

var loadFunctionB = function(){
    //chrome.storage.sync.set({"myValueB": wordObjectB}); activate this to get the program running. The emply storage will throw an error 
    chrome.storage.sync.get("myValueB", //// load saved data. 
    function(valB) {
    if (valB.myValueB === undefined){
        chrome.storage.sync.set({"myValueB": wordObjectB});
        runArrayB();
    } else {
    wordObjectB=valB.myValueB;
    runArrayB();
    }   
  });
 }; 
loadFunctionB();

var runArrayB = function (){
    if (wordObjectB.length<=0) {
        $('h2').text("");
    } else {  
        $('h2').text(wordObjectB[ib].word);
        };
    $(".wordlist-table tbody").empty();
for ( var zb = ib; zb < wordObjectB.length; zb=zb+1 ){   
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[zb].word+"</td><td data-id='" + (zb+1) + "'>"+wordObjectB[zb].definition+"</td><td>"+"<i id=\"deleteLI" + (zb+1) + "\" data-id='" + (zb+1) + "'    class=\"icon-remove\"></i>"+"</td></tr>" );
    } 
for ( var zb = 0; zb < ib; zb=zb+1 ){
  
    $(".wordlist-table tbody").append("<tr><td>"+wordObjectB[zb].word+"</td><td data-id='" + (zb+1) + "'>"+wordObjectB[zb].definition+"</td><td>"+"<i id=\"deleteLI" + (zb+1) + "\" data-id='" + (zb+1) + "'  class=\"icon-remove\"></i>"+"</td></tr>" );
    }
chrome.storage.sync.set({"myValueB": wordObjectB});///save
};

runArrayB();

var baseURL = 'http://en.wiktionary.org';
function showPage(page,text) {
  var sourceurl = baseURL + '/wiki/' + page;
  $('#pagetitle').text(page);
  $('#wikiInfoB').html(text);
  $('#sourceurl').attr('href',sourceurl);
  $('#licenseinfo').show();
  $('#wikiInfoB').children("ol:lt(1)").attr('',   ////////////////// change number of drfinitions eg verb and noun
    function() { //console.log(this);
      //this.children("li:nth-child(-n+2)");
  $(" ol li ul").detach();
  $(" ol li ul").detach();
var wikiDefineB = this.textContent;

var wikiDefineShortB = jQuery.trim(wikiDefineB).substring(0, 500)  /////// shortening the definition for google local storage
                          .trim(this) + "...";
  //var spellItem = document.getElementById('word'); 
    runArrayB();  
    wordObjectB[wordObjectB.length]= { word: page, definition: wikiDefineShortB };
    runArrayB();
    chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
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
       $('#wikiInfoB').html("<div></div>");
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
                                   runArrayB(); 
                                    console.log(wordObjectB); 
                                    
                                    var page = info.selectionText.toLowerCase();
                                    $('#wikiInfoB').html('...please wait...');
                                    $.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&page='+page,
                                    function(json) {
                                      console.log(json.parse);
                                      if(json.parse === undefined) {
                                        console.log("word not found");
                                        wordObjectB[wordObjectB.length]= { word: info.selectionText, definition: "word not found - double click here to add definition" };
                                          runArrayB();
                                          chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                      } else {
                                        showPage(page,json.parse.text['*']);
                                        $('#wikiInfoB').html("<div></div>");
                                        runArrayB();
                                          chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                      }
                                      var tabs = chrome.extension.getViews({type: "tab"});
                                      if (tabs[0]===undefined){
                                        
                                        console.log("not on front page");
                                      }else{
                                        tabs[0].loadBackgroundList();
                                      }
                                    });
                                 }
});

