const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let newWeekGoalWindow;
let isFullScreen = false;
let alertWindow;

function newAlertWindow(file) {
    alertWindow = new BrowserWindow({
        width: 350,
        height: 200,
        modal: true,
        resizable: false,
        maximizable: false,
        parent: mainWindow,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    alertWindow.setMenu(null);
    alertWindow.loadFile(path.join(__dirname, `/app/AlertDialog/alert/${file}.html`));
}

function newWeekGoalDialog() {
    newWeekGoalWindow = new BrowserWindow({
        width: 800,
        height: 700,
        modal: true,
        resizable: false,
        maximizable: false,
        parent: mainWindow,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    newWeekGoalWindow.setMenu(null);
    newWeekGoalWindow.loadFile(path.join(__dirname, '/app/AlertDialog/newWeekGoal/main.html'));
}

function mainLoop() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        resizable: true,
        maximizable: false,
        fullscreenable: true,
        center: true,
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
ipcMain.on('minimize-window', () => {
    if (mainWindow) mainWindow.minimize();
});
ipcMain.on('zoom-window', () => {
    if (mainWindow) {
        isFullScreen = !isFullScreen;
        mainWindow.setFullScreen(isFullScreen);
    };
});

ipcMain.on('close-week-goal', () => {
    if (newWeekGoalWindow) newWeekGoalWindow.close()
    if (alertWindow) alertWindow.close();
});

ipcMain.on('close-alert', () => {
    if (alertWindow) alertWindow = null;
});

ipcMain.handle('readFile', async (_, chemin) => {
    const pattern = path.join(__dirname, chemin);
    const data = await fs.promises.readFile(pattern, 'utf-8');
    return JSON.parse(data);
});

ipcMain.handle('pathJoin', (_, pattern) => {
    return path.join(__dirname, pattern);
});

ipcMain.on('new-week-goal', () => {
    newWeekGoalDialog();
});

ipcMain.on('alert', (_, file) => {
    newAlertWindow(file);
});

app.whenReady().then(() => {
    mainLoop();
});