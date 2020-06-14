const default_dl_path = process.env["USERPROFILE"] + '\\' + productName + '\\Converted';
let content = '{"lang": "en", "format": "mp3", "dl_path": "' + default_dl_path.replace(/\\/g, "\\\\") + '"}';
if(!fs.existsSync(window.configFilePath)) fs.writeFileSync(window.configFilePath, content);
window.setting = editJsonFile(window.configFilePath, {
    autosave: true
});
window.setting.set("dl_path", window.setting.get("dl_path") || default_dl_path);
