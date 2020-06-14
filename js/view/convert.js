
//切换图片
function selectAll(e){
    var ele=e.srcElement;
    var oldSrc=ele.getAttribute("src")
    let src = oldSrc.match(/(\S*)_h\.(.*)/)
    console.log(src)
    if(src){
        ele.setAttribute("src",src[1]+"."+src[2])
    }else{
        let newSrc = oldSrc.match(/(\S*)\.(.*)/);
        ele.setAttribute("src",newSrc[1]+"_h."+newSrc[2])
    }
}





// cut 时间控件
function T(e){
    var ele=e.srcElement;
    var father=ele.parentNode
    //var t=father.textContent;
    
    var t=father.children[0];
    second=makeDurationToSeconds(t.innerHTML)
    var ID=ele.getAttribute("id");
    if(ID==="add"){
        second++
    }else{
        if(second){
            second--
        }
        
    }
    t.innerHTML=secondsToMakeDuration(second)
}

function makeDurationToSeconds(time){
    var str = time;
    var arr = str.split(':');
    var hs = parseInt(arr[0]*3600);
    var ms = parseInt(arr[1]*60);
    var ss = parseInt(arr[2]);
    var seconds = hs + ms + ss;
    return seconds;
}


function secondsToMakeDuration(t) {
    var NowtimeValue = t;
    var nowH = parseInt(NowtimeValue / 3600);
    var nowM = parseInt(NowtimeValue % 3600 / 60);
    var nowS = parseInt(NowtimeValue % 60);
    nowH < 10 ? nowH = "0" + nowH : nowH = nowH;
    nowM < 10 ? nowM = "0" + nowM : nowM = nowM;
    nowS < 10 ? nowS = "0" + nowS : nowS = nowS;
    return nowH + ":" + nowM + ":" + nowS

}