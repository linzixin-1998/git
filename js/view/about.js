$(document).on("click", ".btn-close",function(){
    ipcRenderer.send('close-about');
});
$(document).ready(function(){
    $("#version").text(window.location.search.substr(3));
    getLangText();
});
ipcRenderer.on('get-status', (e, status) => showStatus(status));
function showStatus(status){
    if(status){
        $("#reg").text(lang.about.reg2[la]);
    }else{
        $("#reg").text(lang.about.reg[la]);
    }
}

function getLangText(lan){
    lan = lan || window.la;
    let index = lang.about;
    const indexText = {
        "#about":"about",
        "#reg":"reg",
        "#ver":"ver",
        "#home":"home",
        "#support":"support",
        "#company":"company",
    };
    Object.keys(indexText).forEach(function(key){
        $(key).text(index[indexText[key]][lan]);
    });
    $("#link_home").text(window.lang.link.home_page[window.la]);
    $("#link_support").text(window.lang.link.support[window.la]);
}


$(document).on("click", "#link_home", () =>{
    shell.openExternal(window.lang.link.home_page[window.la]);
});
$(document).on("click", "#link_support", () =>{
    shell.openExternal(window.lang.link.support[window.la]);
});
