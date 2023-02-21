var shareLink = "https://rembeltodo.netlify.app?";

function closeMenu(){
    document.getElementsByClassName("menu_siteopacity")[0].style.visibility="collapse";
    document.getElementsByClassName("menu")[0].style.marginRight="-250px";
}
function openMenu(){
    document.getElementsByClassName("menu_siteopacity")[0].style.visibility="visible";
    document.getElementsByClassName("menu")[0].style.marginRight="0px";
}
function openShareMenu(){
    shareLink = shareLink + getListContent();
    document.getElementsByClassName("share_dialog")[0].showModal();
    document.getElementsByClassName("share_dialog_content_linkbar_text")[0].value = shareLink;
}
function closeShareMenu(){
    document.getElementsByClassName("share_dialog")[0].close();
}
function shareWhatsApp(){
    window.location.href = "WhatsApp://send?text=Klicke auf den Link um meine Einkaufsliste zu deiner hinzufügen. "+shareLink;
}
function shareCopy(){
    navigator.clipboard.writeText(shareLink);
}
function setContent(){
    var content = window.location.search;
    content = content.substring(1);
    setListContent(content);
    window.location.href = "index.html";
}
function insertContent(){
    var content = window.location.search;
    content = content.substring(1);
    insertListContent(content);
    window.location.href = "index.html";
}
function cancleAddMenu(){
    document.getElementsByClassName("addList_dialog")[0].close();
    window.location.href = "index.html"
}