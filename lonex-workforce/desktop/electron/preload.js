const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lonexWorkforce', {
  isDesktop: true,
  getConfig: () => ipcRenderer.invoke('workforce:getConfig'),
  saveEnrollment: (payload) => ipcRenderer.invoke('workforce:saveEnrollment', payload),
  queueIngest: (items) => ipcRenderer.invoke('workforce:queueIngest', items),
  reportSecurity: (event) => ipcRenderer.invoke('workforce:reportSecurity', event),
  flushSync: () => ipcRenderer.invoke('workforce:flushSync'),
  ingestFromModule: (dataType, title, bodyText, metadata = {}) =>
    ipcRenderer.invoke('workforce:queueIngest', [
      {
        data_type: dataType,
        title,
        body_text: bodyText,
        source_module: metadata.source_module || 'lonex-hub',
        metadata,
        client_created_at: new Date().toISOString(),
      },
    ]),
});
