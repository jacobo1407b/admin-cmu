import { BrowserWindow, session, dialog } from 'electron';;
import * as dev from 'electron-is-dev';
import * as path from 'path'



export default class Main {
    private static icoPat: string = dev? __dirname + "/logo192.png":__dirname + "/favicon.png";
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }


    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 1270,
            height: 690,
            minWidth: 1200,
            minHeight: 680,/*
            maxWidth: 2048,
            maxHeight: 900,*/
            //resizable: false,
            title:'ADMIN',
            titleBarStyle: "hiddenInset",
            icon: Main.icoPat,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        });
        Main.mainWindow.setMenu(null);
        Main.mainWindow.setMenuBarVisibility(false);
        Main.mainWindow
            .loadURL(
                dev
                    ? "http://localhost:3000"
                    : `file://${path.join(__dirname, "../index.html")}`
            );
        if (dev) {
            Main.mainWindow.webContents.openDevTools();
        }
        Main.mainWindow.on('closed', Main.onClose);
    }


    static async main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);

    }
}
