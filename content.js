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
  document.getElementById('tabs').innerHTML = '<ol>';
  chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
      document.getElementById('tabs').innerHTML += '<ul> <input type="checkbox" name="' + tabs[i].title +'" value="tab">' + tabs[i].title + '</ul>';
      }
  });
  document.getElementById('tabs').innerHTML = '</ol>';
}

document.getElementById("tabSelection").onsubmit = function() {
  alert("The form was submitted");
};
