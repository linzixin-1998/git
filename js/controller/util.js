window.confirmWindowObj = require(path.resolve("./js/service/confirmObj"));

window.secondToDate = function secondToDate(result) {
    let h = Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60));
    if(h < 10) h = "0" + h;
    if(m < 10) m = "0" + m;
    if(s < 10) s = "0" + s;
    return (h === "00"?"" : h + ":") + m + ":" + s;
};

