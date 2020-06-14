$(document).ready(function(){
    getLangText();
});
function getLangText(lan){
    lan = lan || window.la || "en";
    $("ul#lang-selector>li").show();
    $("ul#lang-selector>li[data-l='" + lan + "']").hide();
    let index = lang.set;
    const indexText = {
        "#set":"set",
        "#text-lang":"lang",
        "#upgrade-btn":"up",
    };
    Object.keys(indexText).forEach(function(key){
        $(key).text(index[indexText[key]][lan]);
    });
    $("#input-lang").val($("#lang-selector>li[data-l='" + la + "']").text());
}

// $(document).on("click","#lang-selector>li",function(){
//     let lang = $(this).attr("data-l");
//     setting.set("lang", lang);
//     window.la = lang;
//     getLangText(lang);
//     ipcRenderer.send('language-change', lang);
// });
$(document).on("click", ".btn-close",function(){
    ipcRenderer.send('close-set');
});

