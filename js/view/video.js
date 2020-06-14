
(function () {
    //给图标添加鼠标事件
    function IconMouseEvent() {
        var img_group = document.getElementById('img_group');
        var img_arr = img_group.children;
        for (let i = 0; i < img_arr.length; i++) {
            let oldSrc = img_arr[i].getAttribute("src")
            //鼠标停留在图标时
            img_arr[i].onmouseover = function () {
                let src = oldSrc.match(/(\S*).png/)[1]
                img_arr[i].setAttribute("src", (src + "_h.png"))
            }
            //鼠标离开图标
            img_arr[i].onmouseout = function () {
                img_arr[i].setAttribute("src", oldSrc)
            }
        }
    }
    IconMouseEvent();

})()