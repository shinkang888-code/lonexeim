const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,

  // ── Recording IPC ──
  startRecording: (sessionId, sources) => {
    ipcRenderer.send('recording:start', { sessionId, sources });
  },
  onRecordingStarted: (callback) => {
    ipcRenderer.on('recording:started', (event, data) => callback(data));
  },
  sendChunk: (sessionId, sourceId, chunk) => {
    ipcRenderer.send('recording:chunk', { sessionId, sourceId, chunk });
  },
  stopRecording: (sessionId) => {
    ipcRenderer.send('recording:stop', { sessionId });
  },
  onRecordingStopped: (callback) => {
    ipcRenderer.on('recording:stopped', (event, data) => callback(data));
  },
  listRecordingFiles: (sessionId) => {
    return ipcRenderer.invoke('recording:listFiles', { sessionId });
  },
  getFileBuffer: (filePath) => {
    return ipcRenderer.invoke('recording:getFileBuffer', { filePath });
  },
  deleteFile: (filePath) => {
    return ipcRenderer.invoke('recording:deleteFile', { filePath });
  },
  getSaveDir: () => {
    return ipcRenderer.invoke('recording:getSaveDir');
  },
  listSessions: () => {
    return ipcRenderer.invoke('recording:listSessions');
  },

  // ── License / Copyright protection ──
  license: {
    getStatus: () => ipcRenderer.invoke('license:getStatus'),
    activate: (managementNumber, licenseKey) =>
      ipcRenderer.invoke('license:activate', { managementNumber, licenseKey }),
    deactivate: () => ipcRenderer.invoke('license:deactivate'),
    getPublisherInfo: () => ipcRenderer.invoke('license:getPublisherInfo'),
  },
});
