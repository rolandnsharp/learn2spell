


// manifest.json required to restore the popup menu
/*
"browser_action": {
    "default_icon": "2.png",
    "default_popup": "popup.html"
  },
*/
var result1 = "List 1";

var result2 = "List 2";

chrome.storage.sync.get("result1Value", //// load saved data. 
    function(res1) {
    if (res1.result1Value === undefined){
        
        console.log("nothin saved 1");
        clf1(result1,result2);
    } else {
    result1=res1.result1Value;
    //$("#list1").html(result1);
    clf1(result1,result2);
    }   
  });

chrome.storage.sync.get("result2Value", //// load saved data. 
    function(res2) {
    if (res2.result2Value === undefined){
      
        console.log("nothin saved 2");
        clf1(result1,result2);
        
    } else {
    result2=res2.result2Value;
    //$("#list2").html(result2);
    clf1(result1,result2);
    }   
  });



var wordObjectB = [{ word: 'test word', definition:'this word is used for back testing' }];

var wordObjectB2 = [{ word: 'test word 2', definition:'this word is used for back testing 2' }];

var loadFunctionB = function(){
    //chrome.storage.sync.set({"myValueB": wordObjectB}); activate this to get the program running. The emply storage will throw an error 
    chrome.storage.sync.get("myValueB", //// load saved data. 
    function(valB) {
    if (valB.myValueB === undefined){
        
        chrome.storage.sync.set({"myValueB": wordObjectB});
        //runArrayB();
    } else {
    wordObjectB=valB.myValueB;
    chrome.storage.sync.set({"myValueB": wordObjectB});///save
    }   
  });
 }; 
loadFunctionB();

var loadFunctionB2 = function(){
    //chrome.storage.sync.set({"myValueB": wordObjectB}); activate this to get the program running. The emply storage will throw an error 
    chrome.storage.sync.get("myValueB2", //// load saved data. 
    function(valB2) {
    if (valB2.myValueB2 === undefined){
        chrome.storage.sync.set({"myValueB2": wordObjectB2});
        
    } else {
    wordObjectB2=valB2.myValueB2;
    chrome.storage.sync.set({"myValueB2": wordObjectB2});///save
    }   
  });
 }; 
loadFunctionB();

var runArrayB = function (){
chrome.storage.sync.set({"myValueB": wordObjectB});///save
chrome.storage.sync.set({"myValueB2": wordObjectB2});///save
};

function openTab(filename)
{
  var myid = chrome.i18n.getMessage("@@extension_id");
  chrome.windows.getCurrent(
  function(win)
  {
    chrome.tabs.query({'windowId': win.id},
    function(tabArray)
    {
      for(var i in tabArray)
      {
        if(tabArray[i].url == "chrome-extension://" + myid + "/" + filename)
        {
          // console.log("already opened");
          chrome.tabs.update(tabArray[i].id, {active: true});
          return;
        }
      }
      chrome.tabs.create({url:chrome.extension.getURL(filename)});
    });
  });
}

runArrayB();
var wikiDefineShortB ="word not found - double click here to add definition";
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

wikiDefineShortB = jQuery.trim(wikiDefineB).substring(0, 500)  /////// shortening the definition for google local storage
                          .trim(this) + "...";
  //var spellItem = document.getElementById('word'); 
    runArrayB();  
   // wordObjectB[wordObjectB.length]= { word: page, definition: wikiDefineShortB };
   // runArrayB();
   // chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
  });
}




$(document).ready(function() {

chrome.browserAction.onClicked.addListener(function(activeTab){
var tabs = chrome.extension.getViews({type: "tab"});
var newURL = "index.html";
  if(tabs[0]===undefined){
    chrome.tabs.create({ url: newURL });
  } else {
    openTab("index.html");
  }
});



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

var clf1 = function (r1,r2){

chrome.contextMenus.removeAll();
chrome.contextMenus.create({title: "Add '%s' to " + r1, 
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
                                        wordObjectB[wordObjectB.length]= { word: info.selectionText.toLowerCase(), definition: "word not found - double click here to add definition" };
                                          runArrayB();
                                          chrome.storage.sync.set({"myValueB": wordObjectB}); /////save
                                      } else {
                                        showPage(page,json.parse.text['*']);
                                        wordObjectB[wordObjectB.length]= { word: info.selectionText.toLowerCase(), definition: wikiDefineShortB };
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
chrome.contextMenus.create({title: "Add '%s' to " + r2,
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
                                        wordObjectB2[wordObjectB2.length]= { word: info.selectionText.toLowerCase(), definition: "word not found - double click here to add definition" };
                                          runArrayB();
                                          chrome.storage.sync.set({"myValueB2": wordObjectB2}); /////save
                                      } else {
                                        showPage(page,json.parse.text['*']);

                                        wordObjectB2[wordObjectB2.length]= { word: info.selectionText.toLowerCase(), definition: wikiDefineShortB };

                                        $('#wikiInfoB').html("<div></div>");
                                        runArrayB();
                                          chrome.storage.sync.set({"myValueB2": wordObjectB2}); /////save
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


};
