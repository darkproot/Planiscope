const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function mainLoop() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        resizable: true,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('app/page/connexion.html');
    mainWindow.setMenu(null);
    // mainWindow.webContents.openDevTools();
}

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});

ipcMain.handle('readFile', async (_, chemin) => {
    const pattern = path.join(__dirname, chemin);
    const data = await fs.promises.readFile(pattern, 'utf-8');
    return JSON.parse(data);
});

ipcMain.handle('pathJoin', (_, pattern) => {
    return path.join(__dirname, pattern);
});

app.whenReady().then(() => {
    mainLoop();
});