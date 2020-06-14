// 多语言组件
window.la = setting.get("lang");
if(!window.la || !/(en|ja)/.test(window.la)){
    window.la = "en";
    setting.set("lang", window.la);
}
const language_file_path = path.resolve((env? (process.resourcesPath + "\\.."): ".\\exe") + "\\language.json");
window.lang = editJsonFile(language_file_path.replace(/\\/g,"\\\\")).data;
