const record2 = require(`${__dirname}/../js/service/record2`);
let rd = new record2();
rd.free(showDaysLimit);

function showDaysLimit(data){
    try{
        let timeLimit = 0;
        if (Date.parse(new Date()) < Date.parse(data.interval)) {
            timeLimit = diffTime(new Date(), new Date(data.interval));
        }
        $("#la-more").html($("#la-more").html() + "<br><br>" + window.lang.reg.time[window.la] + " " + timeLimit);
    }catch(e){
        logging.debug("showDaysLimit: " + e);
    }
}
$(document).on("click","#btn-close, .btn-close",function(){
    ipcRenderer.send('close-register');
});

$(document).on("click",".btn-reg",function(){
    let se = document.getElementsByClassName("se")[0].value;
    if(se){
        setLoad(0);
        let email = $("input[name='email']").val();
        rd.checkKey(getResult, email, se);
    }
});

function setLoad(index){
    return document.getElementsByClassName("btn-reg")[0].style.zIndex = index;
}

function getResult(result) {
    let btn = document.getElementsByClassName("btn-reg")[0];
    try{
        if(result === true){
            shell.openExternal(window.lang.link.register[window.la]);
            setTimeout(function(){
                btn.innerText = lang.index.su[la];
                ipcRenderer.send('register-success');
                ipcRenderer.send('close-register');
            }, 1000);
        }else {
            btn.innerText = lang.index.fa[la];
        }
    }
    catch(e){
        console.log(e);
    }
    setLoad(1);
}

function getLangText(lan){
    lan = lan || window.la;
    let index = lang.reg;
    const indexText = {
        "#la-following":"following",
        "#la-more":"more",
        "#la-benefits":"benefits",
        "#la-limit":"limit",
        "#la-free":"free",
        "#la-upgrades":"upgrades",
        "#la-email":"email",
        "#la-code":"code",
        "#la-need":"need",
        "#la-support":"support",
        "#btn-close":"later",
        "#la-pur":"purchase",
        "#la-reg":"register",
    };
    Object.keys(indexText).forEach(function(key){
        $(key).text(index[indexText[key]][lan]);
    });
    $("#title").text(window.lang.index["product_name"][window.la]);
}

$(document).ready(function(){
    getLangText();
    $("#input-email").val(window.setting.get("em") || "");
    $("#input-se").val(window.setting.get("se") || "");
});

function diffTime(startDate,endDate) {
    let diff=endDate.getTime() - startDate;
    let days=Math.floor(diff/(24*3600*1000));
    return days;
}



$(document).on("click","#la-support", () =>{
    shell.openExternal(window.lang.link.support[window.la]);
});
$(document).on("click","#la-pur", () =>{
    shell.openExternal(window.lang.link.purchase[window.la]);
});
