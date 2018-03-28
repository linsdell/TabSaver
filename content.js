class TabGroup{
  constructor(tabList, name){
    this.tabList = tabList;
    this.name = name;
  }
}

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
  chrome.storage.local.get(null, function (items) {
    document.getElementById('savedTabs').innerHTML += '<p>' + items.data.name  + ' </p>';
    console.log(items);
     });
  //document.getElementById('tabs').innerHTML = '';
  chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
          document.getElementById('tabList').innerHTML += '<li> <input class="tabSelect" type="checkbox" value="' + tabs[i].url + '">' + tabs[i].title + '</li>';
      }
  });
}

$(document).ready(function(){
    $("#groupButton").click(function(){
    var groupName = document.getElementById('groupNameInput').value
    var list = $(".tabSelect");
    var selectedList = [];
     for(i =0; i<list.length; i++){
        if(list[i].checked){
          selectedList.push(list[i].value);

        //  document.getElementById('savedTabs').innerHTML += '<p> added ' +  list[i].checked + " " + i + ' </p>';
       }
    }
    if(groupName == null){
      groupName = selectedList[0];
    }

    var newGroup = new TabGroup(selectedList, groupName);
    //for(i = 0; i<newGroup.tabList.length;i++){
    //  document.getElementById('savedTabs').innerHTML += '<p>' +  newGroup.tabList[i] + ' </p>';
    document.getElementById('savedTabs').innerHTML += '<a onclick="openGroup(newGroup.name)" href="#" id="newGroup.name">' +  newGroup.name + ' </a>';
    //document.getElementById('savedTabs').innerHTML += '<a href="https://www.w3schools.com" target="_blank">' +  newGroup.name + ' </a>';
    //}
    var testData = {'name':newGroup.name,'data':newGroup.tabList}
    var passedVal = {};
    passedVal[newGroup.name] = testData;
    chrome.storage.local.set(passedVal, function() {
          // Notify that we saved.
          message('Tabs saved');
        });
    });
});

function openGroup(name) {
    window.alert(name);
}
