function come(){
    ipcRenderer.send('open-convert');
}
function minWindow(){
    ipcRenderer.send('min-index');
}
function maxWindow(){
    ipcRenderer.send('max-index');
}
function closeWindow(){
    ipcRenderer.send('close-index');
}