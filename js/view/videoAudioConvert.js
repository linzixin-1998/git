function showConverting(e){
    var empty=document.getElementById("empty");
    var videoList=document.getElementById("videoList");
    var self=e.srcElement;
    //切换视频列表或背景
    empty.style.display="none";
    videoList.style.display="block";
    self.classList.add("convertingClink");
}