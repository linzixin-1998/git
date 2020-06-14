(function(){
    tab_bal();

})()

// tab_bal切换
function tab_bal(){
    
    var bal=document.getElementById("tab-bal");
    
    var childs=bal.children;
    for(let i=0;i<childs.length;i++){
        //console.log(childs[i])
        childs[i].addEventListener("click",function(){
            for(let j=0;j<childs.length;j++){
                childs[j].setAttribute("class","")
            }
            childs[i].setAttribute("class","tab-bal-onclink")
        })
    }
    
}