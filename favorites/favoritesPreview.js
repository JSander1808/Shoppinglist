var productAdder_textbox = document.getElementsByClassName("mdl-textfield__input")[0];
productAdder_textbox.addEventListener("focus", (event) => {
  document.getElementsByClassName("favorites_list_preview_body_productAdder_submit")[0].style.opacity = "1";
});

var productAdder_textbox = document.getElementsByClassName("mdl-textfield__input")[0];
productAdder_textbox.addEventListener("focusout", (event) => {
  document.getElementsByClassName("favorites_list_preview_body_productAdder_submit")[0].style.opacity = "0";
});

var items = [];
var itemCount = [];
var listName = "";
var favoriteLists = [];
var favoriteListsTitle = [];
updateFavoriteList();

function reset() {
  items = [];
  itemCount = [];
  listName = "";
}

function addItem() {
  var itemName = document.getElementsByClassName("mdl-textfield__input")[0].value;
  if (!(itemName === null)) {
    if (!(itemName === "")) {
      document.getElementsByClassName("mdl-textfield__input")[0].value = "";
      document.getElementsByClassName("mdl-textfield__input")[0].placeholder = "Produkt hinzufügen...";
      var isExist = false;
      for (var i = 0; i < items.length; i++) {
        if (items[i] === itemName) {
          itemCount[i] = (parseInt(itemCount[i]) + 1);
          isExist = true;
        }
      }
      if (isExist === false) {
        items.push(itemName);
        itemCount.push(1);
      }
    }
  }
  update();
}

function clear() {
  document.getElementsByClassName("favorites_list_preview_body_list_ul")[0].innerHTML = "";
}

function update() {
  clear();
  if (items.length >= 1) {
    for (var i = 0; i < items.length; i++) {
      document.getElementsByClassName("favorites_list_preview_body_list_ul")[0].innerHTML += "<li class='favorites_list_preview_body_list_ul_li'> <p class='favorites_list_preview_body_list_ul_li_item_name'>" + items[i] + "</p> <div class='favorites_list_preview_body_list_buttons'> <button onclick='addItemCount(" + i + ")' class='favorites_list_preview_body_list_itemCount_button'>+</button> <p class='favorites_list_preview_body_list_buttons_p'>" + itemCount[i] + "</p>  <button onclick='removeItemCount(" + i + ")' class='favorites_list_preview_body_list_itemCount_button'>-</button> <button onclick='deleteItem(" + i + ")' class='favorites_list_preview_body_list_buttons_remove_button'>X</button> </div> </li>";
    }
  }
}

function addItemCount(index) {
  itemCount[index] = (parseInt(itemCount[index]) + 1);
  update();
}

function removeItemCount(index) {
  itemCount[index] = (parseInt(itemCount[index]) - 1);
  if (itemCount[index] == 0) {
    deleteItem(index);
  } else {
    update();
  }
}

function deleteItem(index) {
  items.splice(index, 1);
  itemCount.splice(index, 1);
  update();
}

function closePreview() {
  document.getElementsByClassName("favorites_list_preview")[0].style.display = "none";
  document.getElementsByClassName("favorites_list_preview")[0].style.visibility = "collapse";
  document.getElementsByClassName("favorites_list")[0].style.visibility = "visible";
  document.getElementsByClassName("favorites_list")[0].style.display = "contents";
  updateFavoriteList();
}

function createFavoriteList() {
  clear();
  reset();
  var rightName = false;
  while (!(rightName === true)) {
    listName = window.prompt("Wie soll Ihre Favoritenliste heißen?");
    if (!(listName === "")) {
      rightName = true;
    }
  }
  if (!(listName === null)) {
    document.getElementsByClassName("favorites_list_preview")[0].style.display = "contents";
    document.getElementsByClassName("favorites_list_preview")[0].style.visibility = "visible";
    document.getElementsByClassName("favorites_list")[0].style.visibility = "collapse";
    document.getElementsByClassName("favorites_list")[0].style.display = "none";
  }
}

function loadList(data) {
  document.getElementsByClassName("favorites_list_preview")[0].style.display = "contents";
  document.getElementsByClassName("favorites_list_preview")[0].style.visibility = "visible";
  document.getElementsByClassName("favorites_list")[0].style.visibility = "collapse";
  document.getElementsByClassName("favorites_list")[0].style.display = "none";
  reset();
  var content = base64Decode(data.split("ypweml")[1]);
  listName = data.split("ypweml")[0];
  console.log(data.split("ypweml").length);
  if (!(data.split("ypweml")[1] === "")) {
    var rowContent = content.split("mek4hg");
    for (var i = 0; i < rowContent.length; i++) {
      var temp = rowContent[i].split("nej4nf");
      items.push(temp[0]);
      itemCount.push(temp[1]);
      console.log("debug83")
    }
  }
  update();
}

function saveList() {
  var listContent = "";
  for (var i = 0; i < items.length; i++) {
    var temp = items[i] + "nej4nf" + itemCount[i];
    listContent = listContent + temp;
    if (i < items.length - 1) {
      listContent = listContent + "mek4hg";
    }
  }
  var isExist = false;
  var itemNumber = 0;
  for (var i = 0; i < localStorage.length; i++) {
    try{
      if(!(localStorage.getItem("fav"+i)===null)){
        itemNumber = parseInt(itemNumber) + 1;
      }
      if (localStorage.getItem("fav" + i).split("ypweml")[0] === listName) {
        localStorage.setItem("fav" + i, (listName + "ypweml" + base64Encode(listContent)));
        isExist = true;
      }
    }catch(error){};
  }
  if (isExist === false) {
    localStorage.setItem("fav" + itemNumber, (listName + "ypweml" + base64Encode(listContent)));
  }
  reset();
  closePreview();
  updateFavoriteList();
}

function deleteList(index) {
  localStorage.removeItem("fav"+index);
  updateFavoriteList();
}

function addMainList(index) {
  var content = base64Decode(localStorage.getItem("fav"+index).split("ypweml")[1]);
  content = content + "yhmpxwithout_asking";
  console.log(content);
  window.location.href = "index.html?" + base64Encode(content);
}

function updateFavoriteList() {
  favoriteLists = [];
  favoriteListsTitle = [];
  document.getElementsByClassName("favorites_list_lists")[0].innerHTML = "";
  for (var i = 0; i < localStorage.length; i++) {
    try{
      favoriteLists.push(localStorage.getItem("fav"+i));
      favoriteListsTitle.push(localStorage.getItem("fav"+i).split("ypweml")[0]);
      document.getElementsByClassName("favorites_list_lists")[0].innerHTML += "<li class='favorites_list_lists_ul_li'> <p>" + localStorage.getItem("fav"+i).split("ypweml")[0] + "</p> <div class='favorites_list_lists_ul_li_buttons'> <button onclick='addMainList(" + i + ")' class='favorites_list_lists_ul_li_buttons_Button'>+</button> <button onclick='loadList(favoriteLists[" + i + "])' class='favorites_list_lists_ul_li_buttons_Button'>✎</button> <button onclick='deleteList(" + i + ")' class='favorites_list_lists_ul_li_buttons_removeButton'>X</button> </div> </li>"
    }catch(error){};
  }
}

function base64Encode(str) {
  // Convert the string to a UTF-8 byte array
  const utf8Bytes = new TextEncoder().encode(str);

  // Use the built-in btoa function to base64-encode the byte array
  const base64String = btoa(String.fromCharCode(...utf8Bytes));

  return base64String;
}

function base64Decode(base64Str) {
  // Decode the Base64 string into a byte array
  const decodedBytes = new Uint8Array(atob(base64Str).split('').map(char => char.charCodeAt(0)));

  // Convert the byte array to a UTF-8 string
  const decodedString = new TextDecoder().decode(decodedBytes);

  return decodedString;
}