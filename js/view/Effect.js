function imgItemClick(e){
    var item=e.srcElement;
    var Img=document.getElementById('effectImg');
    Img.setAttribute("src",item.getAttribute("src"));
    
}
