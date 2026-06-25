'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lonexLicense', {
  getStatus: () => ipcRenderer.invoke('license:getStatus'),
  activate: (managementNumber, licenseKey) =>
    ipcRenderer.invoke('license:activate', { managementNumber, licenseKey }),
  deactivate: () => ipcRenderer.invoke('license:deactivate'),
  getPublisherInfo: () => ipcRenderer.invoke('license:getPublisherInfo'),
  complete: (result) => ipcRenderer.invoke('license:activation-complete', result),
});
