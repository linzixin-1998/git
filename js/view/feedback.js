$(document).on("click",".btn-close", () =>{
    ipcRenderer.send('close-feedback');
});

$(document).on("click",".check-box", function() {
    $(this).attr("data-b", ~Number($(this).attr("data-b")));
});


// send review
$(document).on("click","#btn-submit", function() {
    let th = $(this);
    if(!navigator.onLine){
        return th.text(window.lang.feedback["network"][window.la]);
    }
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if((!$("#email").val()) || !reg.test($("#email").val())){
        $("#email").addClass("null");
        setTimeout(()=>$("#email").removeClass("null"), 2000);
        return th.text(window.lang.feedback["yE"][window.la]);
    }
    if(!$("#content").val()){
        $("#content").addClass("null");
        setTimeout(()=>$("#content").removeClass("null"), 2000);
        return th.text(window.lang.feedback["yP"][window.la]);
    }
    th.text(window.lang.feedback["ing"][window.la]).attr("disabled", "disabled");
    try{
        if($(".check-box[data-b='-1']").length > 0){
            let file = process.env["APPDATA"] + "\\" + remote.app.getName() + "\\log.log";
            $("#file").val(fs.readFileSync(file, 'utf8') + fs.readFileSync(window.config_path, 'utf8'));
        }else{
            $("#file").val("");
        }
        $("#userID").text(userID);
    }catch(e){
        logging.warn("get log file error: " + e);
    }
    $.ajax({
        type: 'POST',
        url: _projectConfig.server + '/feedback/software/',
        data: $("#feedback-form").serialize(),
        success: (msg) => {
            msg = JSON.parse(msg);
            if(msg.result == "success"){
                $("#email, #content").val("");
            }
            th.text(window.lang.feedback["su"][window.la]).removeAttr('disabled');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            logging.warn("send feedback error: " + textStatus + ",thrown: " + errorThrown);
            th.text(window.lang.feedback["er"][window.la]).removeAttr('disabled');
        }
    });
});

$(document).ready(function(){
    getLangText();
});

function getLangText(lan){
    lan = lan || window.la;
    let index = lang.feedback;
    const indexText = {
        "#feedback":"feedback",
        "#thanks":"thanks",
        "#text-em":"email",
        "#text-con":"content",
        "#attach":"attach",
        "#btn-submit":"submit",
    };
    Object.keys(indexText).forEach(function(key){
        $(key).text(index[indexText[key]][lan]);
    });

}
