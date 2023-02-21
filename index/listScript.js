var itemList = [];
var itemListCount = [];
updateList();
loadListContent();

function loadListContent() {
    var url = base64Decode(window.location.search.substring(1));
    if (!(url === "")) {
        console.log(url.split("yhmpx").length);
        if (url.split("yhmpx").length == 2) {
            if (url.split("yhmpx")[1] === "without_asking") {
                insertListContent(window.location.search.substring(1));
                window.location.href = "index.html";
            }
        } else {
            document.getElementsByClassName("addList_dialog")[0].showModal();
        }
    }
}

function loadItems() {
    itemList.splice(0, itemList.length);
    itemListCount.splice(0, itemListCount.length);
    for (var i = 0; i < localStorage.length; i++) {
        try {
            var item = localStorage.getItem(i).split("--");
            if (item[0] === "list") {
                itemList.push(item[1]);
                itemListCount.push(item[2]);
            }
        } catch (error) { };
    }
}

function saveItem() {
    for (var i = 0; i < localStorage.length; i++) {
        try {
            localStorage.removeItem(i);
        } catch (error) { };
    }
    for (var i = 0; i < itemList.length; i++) {
        localStorage.setItem(i, "list--" + itemList[i] + "--" + itemListCount[i]);
    }
}

function removeItem(index) {
    itemList.splice(index, 1);
    itemListCount.splice(index, 1);
    for (var i = 0; i < localStorage.length + 100; i++) {
        try {
            localStorage.removeItem(i);
        } catch (error) { };
    }
    for (var i = 0; i < itemList.length; i++) {
        localStorage.setItem(i, "list--" + itemList[i] + "--" + itemListCount[i]);
        console.log(i + " - " + "list--" + itemList[i] + "--" + itemListCount[i]);
    }

    updateList();
}

function clearAll() {
    for (var i = 0; i < localStorage.length; i++) {
        try {
            localStorage.removeItem(i);
        } catch (error) { };
    }
    document.getElementsByClassName("body_content_list_ul")[0].innerHTML = "";
}

function clearList() {
    document.getElementsByClassName("body_content_list_ul")[0].innerHTML = "";
}

function updateList() {
    clearList();
    loadItems();
    for (var i = 0; i < itemList.length; i++) {
        document.getElementsByClassName("body_content_list_ul")[0].innerHTML += "<li class='body_content_list_ul_li'> <p class='body_content_list_ul_li_item_name'>" + itemList[i] + "</p> <div class='body_content_list_buttons'> <button class='body_content_list_itemCount_button' onclick='addItemCount(" + i + ")'>+</button> <p class='body_content_list_buttons_p'>" + itemListCount[i] + "</p> <button class='body_content_list_itemCount_button' onclick='removeItemCount(" + i + ")'>-</button> <button class='body_content_list_buttons_remove_button' onclick='removeItem(" + i + ")'>X</button> </div></li>";
    }
}

function addItem() {
    var itemName = document.getElementsByClassName("mdl-textfield__input")[0].value;
    var regex = /--/;
    if (!regex.test(itemName)) {
        if (!(itemName === "")) {
            if (!(itemName == null)) {
                document.getElementsByClassName("mdl-textfield__input")[0].value = "";
                document.getElementsByClassName("mdl-textfield__input")[0].placeholder = "Produkt hinzufügen...";
                var listContent = [];
                var isExist = false;
                for (var i = 0; i < localStorage.length; i++) {
                    try {
                        var temp = localStorage.getItem(i).split("--");
                        if (temp[1] === itemName) {
                            listContent.push("list--" + temp[1] + "--" + (parseInt(temp[2]) + 1));
                            isExist = true;
                        } else {
                            listContent.push(localStorage.getItem(i));
                        }
                    } catch (error) { };
                }
                if (isExist === false) {
                    listContent.push("list--" + itemName + "--1");
                }
                for (var i = 0; i < localStorage.length + 100; i++) {
                    try {
                        localStorage.removeItem(i);
                    } catch (error) { };
                }
                for (var i = 0; i < listContent.length; i++) {
                    localStorage.setItem(i, listContent[i]);
                }
            }
        }
    }
    updateList();
    saveItem();
}

function addPecifiedItem(itemName, itemCount) {
    var regex = /--/;
    if (!regex.test(itemName)) {
        if (!(itemName === "")) {
            if (!(itemName == null)) {
                var listContent = [];
                var isExist = false;
                for (var i = 0; i < localStorage.length; i++) {
                    try {
                        var temp = localStorage.getItem(i).split("--");
                        if (temp[1] === itemName) {
                            listContent.push("list--" + temp[1] + "--" + (parseInt(temp[2]) + parseInt(itemCount)));
                            isExist = true;
                        } else {
                            listContent.push(localStorage.getItem(i));
                        }
                    } catch (error) { };
                }
                if (isExist === false) {
                    listContent.push("list--" + itemName + "--" + itemCount);
                }
                for (var i = 0; i < localStorage.length; i++) {
                    try {
                        localStorage.removeItem(i);
                    } catch (error) { };
                }
                for (var i = 0; i < listContent.length; i++) {
                    localStorage.setItem(i, listContent[i]);
                }
            }
        }
    }
    updateList();
    saveItem();
}

function addItemCount(index) {
    var itemCount = itemListCount[index];
    itemCount++;
    localStorage.setItem(index, "list--" + itemList[index] + "--" + itemCount);
    updateList();
    saveItem();
}

function removeItemCount(index) {
    var itemCount = itemListCount[index];
    itemCount--;
    if (itemCount <= 0) {
        removeItem(index);
    } else {
        localStorage.setItem(index, "list--" + itemList[index] + "--" + itemCount);
    }
    updateList();
    saveItem();
}

function getListContent() {
    var listContent = "";
    for (var i = 0; i < itemList.length; i++) {
        var temp = itemList[i] + "nej4nf" + itemListCount[i];
        if (i < itemList.length - 1) {
            temp = temp + "mek4hg";
        }
        listContent = listContent + temp;
    }
    return base64Encode(listContent);
}

function getListContentWithArgs(args) {
    var listContent = "";
    for (var i = 0; i < itemList.length; i++) {
        var temp = itemList[i] + "nej4nf" + itemListCount[i];
        if (i < itemList.length - 1) {
            temp = temp + "mek4hg";
        }
        listContent = listContent + temp;
    }
    listContent = listContent + args;
    return base64Encode(listContent);
}

function setListContent(content) {
    clearAll();
    var listContent = base64Decode(content);
    console.log(listContent);
    var item = listContent.split("mek4hg");
    for (var i = 0; i < item.length; i++) {
        var temp = item[i].split("nej4nf");
        localStorage.setItem(i, "list--" + temp[0] + "--" + temp[1]);
    }
    updateList();
    saveItem();
}

function insertListContent(content) {
    var listContent = base64Decode(content);
    console.log(listContent);
    if (listContent.split("yhmpx").length === 2) {
        listContent = listContent.split("yhmpx")[0];
    }
    var item = listContent.split("mek4hg");
    for (var i = 0; i < item.length; i++) {
        var temp = item[i].split("nej4nf");
        addPecifiedItem(temp[0], temp[1]);
    }
    updateList();
    saveItem();
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

var productAdder_textbox = document.getElementsByClassName("mdl-textfield__input")[0];
productAdder_textbox.addEventListener("focus", (event) => {
    document.getElementsByClassName("body_content_productAdder_submit")[0].style.opacity = "1";
});

var productAdder_textbox = document.getElementsByClassName("mdl-textfield__input")[0];
productAdder_textbox.addEventListener("focusout", (event) => {
    document.getElementsByClassName("body_content_productAdder_submit")[0].style.opacity = "0";
});