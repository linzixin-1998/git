window.onload=function(){
    loadScroll();
}


//进度条事件
function loadScroll(){
    var scroll = document.getElementsByClassName('scroll');
    var bar = document.getElementsByClassName('bar');
    var mask = document.getElementsByClassName('mask');
    var barleft = 0;
    for(let i=0;i<scroll.length;i++){
        bar[i].onmousedown = function(event){
            var event = event || window.event;
            var leftVal = event.clientX - this.offsetLeft;
            var that = this;
            document.onmousemove = function(event){
                var event = event || window.event;
                barleft = event.clientX - leftVal;          
                if(barleft < 0)
                    barleft = 0;
                else if(barleft > scroll[i].offsetWidth - bar[i].offsetWidth)
                    barleft = scroll[i].offsetWidth - bar[i].offsetWidth;
                mask[i].style.width = barleft +'px' ;
                that.style.left = barleft + "px";
                //百分比
                var percent=parseInt(barleft/(scroll[i].offsetWidth-bar[i].offsetWidth) * 100) + "%"
                console.log(percent);
                
                //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }
        }
        
    }
    document.onmouseup = function(){
        document.onmousemove = null; 
    }
}