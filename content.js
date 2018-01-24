chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);

window.onload = function () {
  chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
          document.getElementById('tabList').innerHTML += '<li> <input class="tabSelect" type="checkbox" value="' + tabs[i].title + '">' + tabs[i].title + '</li>';
      }
  });
}

$(document).ready(function(){
    $("#groupButton").click(function(){
    var list = $(".tabSelect:checked");
     //for(i =0; i<list.length; i++){
        //if(list[i].checked){
        //  document.getElementById('savedTabs').innerHTML += '<p> added ' +  list[i].checked + " " + i + ' </p>';
        //document.getElementById('savedTabs').innerHTML += '<p> added ' +  list.length + " " + ' </p>';
    //   }
    //}
    /**
    chrome.storage.sync.set({'tabsToOpen': theValue}, function() {
         // Notify that we saved.
         message('Settings saved');
       });
    }); **/
});
