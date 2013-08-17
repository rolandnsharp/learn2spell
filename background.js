

var wordObjectB = [
    { word: 'test', definition:'test definition' }
    
];

var loadFunction = function(){
    //chrome.storage.sync.set({"myValue": wordObject}); activate this to get the program running. The emply storage will throw an error 
    chrome.storage.sync.get("myValueB", //// load saved data. 
    function(val) {
    if (val.myValueB === undefined){
        chrome.storage.sync.set({"myValueB": wordObjectB});
       
    } else {
    wordObjectB=val.myValueB;
    
    }   
    
  });
 }; 


$( document ).ready(function() {
    loadFunction();
});



var saveFunction =function(){
    chrome.storage.sync.set({"myValueB": wordObjectB});
};



chrome.contextMenus.removeAll();
chrome.contextMenus.create({title: "Learn 2 Spell '%s' ", 
                             contexts:["selection"], 
                              onclick: function(info){ 
                                wordObjectB[wordObjectB.length] = { word: info.selectionText, definition: " 'add definition' " };
                                console.log(wordObjectB);
                                saveFunction();
                                ///chrome.extension.getViews = function() { console.log("hello");};
                               // var view = chrome.extension.getViews({"type":"tab", "windowId": tab.windowId));
                               // console.log(view);

                               // var tabs = chrome.extension.getViews({type: "tab"});
                               // tabs[0].backToFront();                                        sending function. 
                               
                               
                                
                               // console.log(wordObjectB);
                                //chrome.contextMenus.removeAll();
                                //location.reload(); /////////// refreshes page ! probably not good
                                 }
});

