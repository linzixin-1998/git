// 捕获所有未catch到的错误，并发送到远端服务器
window.onerror = function myErrorHandler(errorMsg, errorFileName) {
    logging.warn("catch all error: " + errorMsg + " " + errorFileName);
    window.autoSendFeedback("onerror", errorMsg, errorFileName);
    return false;
};
window.autoSendFeedback = function autoSendFeedback(eventType = "", ...errorMsg) {
    console.info(errorMsg.join("\n"));
    if(env){
        $.ajax({
            type: 'POST',
            url: _projectConfig.server + '/feedback/software/',
            data: { email: window.version + " " + window.machine_id, eventType: eventType, product: osVersion, content: navigator.userAgent + errorMsg.join("\n"), file: getUserFileContent() }
        });
    }
};


function getUserFileContent(){
    return fs.readFileSync(window.logFilePath, 'utf8') + "\n" + fs.readFileSync(window.configFilePath, 'utf8');
}


