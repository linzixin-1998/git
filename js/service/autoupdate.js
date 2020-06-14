const {app, BrowserWindow, ipcMain} = require("electron");
const log = require('electron-log');

function Updater() {
    let settingWindow;
    let mainWindow;
    let upgrade = null;

    const {autoUpdater} = require("electron-updater");
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';
    autoUpdater.autoDownload  = false;
    ipcMain.on("close-version", () => {
        if(upgrade) upgrade.close();
    });

    autoUpdater.on('update-available', (info) => {
        this.logger('Update available.');
        log.info(info);
        this.createDefaultWindow();
        upgrade.webContents.once('did-finish-load', () => {
            upgrade.webContents.send('get-notes', info.version, info.releaseNotes)
        });
    });
    autoUpdater.on('update-not-available', () => {
        if(settingWindow) settingWindow.webContents.send('update-not-available');
        this.logger('Update not available.');
    });
    autoUpdater.on('error', (err) => { this.logger('Error in auto-updater. ' + err); });
    autoUpdater.on('update-downloaded', () => {
        this.logger('Update downloaded');
        autoUpdater.quitAndInstall(true, true);
    });
    ipcMain.on("checking-for-update", () => {
        autoUpdater.checkForUpdates();
    } );
    ipcMain.on("download-version", () => {
        this.logger('download new version');
        autoUpdater.on('download-progress', (progressObj) => {
            // let log_message = "Download speed: " + progressObj.bytesPerSecond;
            // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
            // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
            // this.logger(log_message);
            upgrade.webContents.send('get-update-percent', progressObj.percent)

        });
        autoUpdater.downloadUpdate();
    });

    this.init = (main)=>{
        mainWindow = main;
        log.info('App starting.');
    };

    this.check = (settingWin)=>{
        settingWindow = settingWin;
        autoUpdater.checkForUpdates()
    };

    this.logger = (text)=>{
        log.info(text);
    };

    this.createDefaultWindow = ()=>{
        if (upgrade) {
            if (upgrade.isMinimized()) upgrade.restore();
            upgrade.focus()
        }else{
            upgrade = new BrowserWindow({
                width: 600,
                height: 410,
                fullscreen: false,
                parent: mainWindow,
                modal: true,
                webPreferences: {
                    nodeIntegration: true
                },
                useContentSize: true,
                autoHideMenuBar: true,
                icon: 'imgs/icon.png',
                frame: false,
                show: false,
                backgroundColor: '#3E3C3C'
            });
            upgrade.on('closed', () => upgrade = null);
            upgrade.on('ready-to-show', () => {
                upgrade.show();
            });
            upgrade.loadURL(`file://${__dirname}/../html/version.html?v=${app.getVersion()}`);
            // upgrade.openDevTools();
        }
    }

}

module.exports = Updater;
