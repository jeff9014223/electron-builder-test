const { updateElectronApp } = require("update-electron-app")
const { app, BrowserWindow } = require("electron")
const path = require("node:path")

updateElectronApp({
    repo: "https://github.com/jeff9014223/electron-builder-test",
    updateInterval: "5 minutes",
})

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        resizable: false,
        autoHideMenuBar: true,
        disableAutoHideCursor: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    
    win.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})