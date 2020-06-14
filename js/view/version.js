$(document).on("click",".btn-close, #remind", ()=>{
    ipcRenderer.send('close-version');
});
$(document).on("click","#upgrade", ()=>{
    ipcRenderer.send('download-version');
    $(".load").css("z-index", 0)
});

ipcRenderer.on('get-notes', (e, ver, info) => {
    $("#version").html(ver);
    $("#text").html(info);
});
ipcRenderer.on('get-update-percent', (e, per) => {
    try{
        $("#upgrade").text(per.toString().split(".")[0]);
    }catch(e){
        logging.debug("show per: " + per + " " + e);
    }
});



$(document).ready(function(){
    getLangText();
});
function getLangText(lan){
    lan = lan || window.la;
    let index = lang.version;
    const indexText = {
        "#page_title":"update",
        "#remind":"remind",
        "#upgrade":"upgrade",
    };
    Object.keys(indexText).forEach(function(key){
        $(key).text(index[indexText[key]][lan]);
    });
    $("#title").text(window.lang.index["product_name"][window.la]);
}
