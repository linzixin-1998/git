(function(){
    window.onload=function(){
        var tabs=document.getElementById("ConversionList-head").children;
        for(let i=0;i<tabs.length;i++){
            tabs[i].onclick=function(){

                for(let j=0;j<tabs.length;j++){
                    tabs[j].style.borderColor="var(--border-color)"
                }
                tabs[i].style.borderColor="var(--content-title)"
            }
        }

    }
})()