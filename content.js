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

  document.getElementById('tabs').innerHTML = '<ul style="list-style-type: none" id="tabList">';
  chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
      document.getElementById('tabs').innerHTML += '<li> <input class="tabSelect" type="checkbox" name="' + tabs[i].title +'" value="tab">' + tabs[i].title + '</li>';
      }
  });
  document.getElementById('tabs').innerHTML = '</ul>';
}

$(document).ready(function(){
    $("#groupButton").click(function(){
    var list = $(".tabSelect");
    var i = 0;
     //for(box in list){
        //if(box.checked){
          document.getElementById('savedTabs').innerHTML += '<p> added ' +  list + ' </p>';
        //  i++;
       //}
    //}
    });
});
