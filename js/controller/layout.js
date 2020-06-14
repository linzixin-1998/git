class AmcProject {
    constructor(server, name, ) {
        // this.server = server;
        // this.name = name;
    }
}


window._projectConfig = new AmcProject(
    // "https://wamc.dumpmedia.com",
    // "DumpMedia",

);

const {ipcRenderer, remote, shell} = require("electron");
window.logging = require('electron-log');
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');
window.setting = new Store();
const os = require('os');
const osVersion = os.release();
const publicIp = require('public-ip');
(async ()=> window.userIP = await publicIp.v4())();
const productApp = remote.app;
window.env = productApp.isPackaged;
window.version = productApp.getVersion();
window.productName = productApp.name;
$("title").text(window.productName);
const {machineIdSync} =  require('node-machine-id');
const userID = machineIdSync({original: true});
const editJsonFile = require("edit-json-file");
window.logFilePath = process.env["APPDATA"] + "\\" + window.productName + "\\log.log";
window.configFilePath = productApp.getPath('userData') + "\\config.json";
const {spawn, exec, execSync, spawnSync} = require('child_process');

// require(path.resolve("./js/service/parse"));
require(path.resolve("./js/service/language"));
require(path.resolve("./js/service/handleError"));
require(path.resolve("./js/service/userConfig"));
require(path.resolve("./js/controller/util"));




