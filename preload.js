const { contextBridge, ipcRenderer } = require('electron');

const API = {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    zoomWindow: () => ipcRenderer.send('zoom-window'),
    readJSON: async (path) => ipcRenderer.invoke('readFile', path),
    pathJoin: (path) => ipcRenderer.invoke('pathJoin', path),
};

contextBridge.exposeInMainWorld('electronAPI', API);