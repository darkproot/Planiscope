const { contextBridge, ipcRenderer } = require('electron');

const API = {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    zoomWindow: () => ipcRenderer.send('zoom-window'),
    readJSON: async (path) => ipcRenderer.invoke('readFile', path),
    pathJoin: (path) => ipcRenderer.invoke('pathJoin', path),
    newWeekGoal: () => ipcRenderer.send('new-week-goal'),
    closeWeekGoal: () => ipcRenderer.send('close-week-goal'),
    newAlert: (file) => ipcRenderer.send('alert', file),
    closeAlertWindow: () => ipcRenderer.send('close-alert'),
};

contextBridge.exposeInMainWorld('electronAPI', API);