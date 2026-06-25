const { contextBridge, ipcRenderer } = require('electron');

// 현재 설치된 앱 버전 (main 프로세스에서 동기 조회)
let APP_VERSION = '';
try { APP_VERSION = ipcRenderer.sendSync('app:get-version') || ''; } catch { APP_VERSION = ''; }

// updater 이벤트 구독 헬퍼 — cb 등록 후 해제 함수 반환
function subscribe(channel) {
  return (cb) => {
    if (typeof cb !== 'function') return () => {};
    const handler = (_event, data) => cb(data);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeListener(channel, handler);
  };
}

// 자동 업데이트 브리지 (렌더러의 ElectronUpdateToast 가 사용)
const updater = {
  check: () => ipcRenderer.send('updater:check'),
  download: () => ipcRenderer.send('updater:download'),
  install: () => ipcRenderer.send('updater:install'),
  openExternal: (url) => ipcRenderer.send('updater:open-external', url),
  onAvailable: subscribe('updater:available'),
  onNotAvailable: subscribe('updater:not-available'),
  onProgress: subscribe('updater:progress'),
  onDownloaded: subscribe('updater:downloaded'),
  onError: subscribe('updater:error'),
};

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,
  appVersion: APP_VERSION,
  // meta: 딥링크 객체 { kind:'chat'|'mail', roomId, msgId, parentId, emailId }.
  // 하위호환을 위해 문자열(roomId)도 그대로 전달(main 에서 정규화).
  showNotification: (title, body, meta) => {
    ipcRenderer.send('show-notification', { title, body, meta });
  },
  updateBadge: (count) => {
    ipcRenderer.send('update-badge', count);
  },
  updater,
  license: {
    getStatus: () => ipcRenderer.invoke('license:getStatus'),
    activate: (managementNumber, licenseKey) =>
      ipcRenderer.invoke('license:activate', { managementNumber, licenseKey }),
    deactivate: () => ipcRenderer.invoke('license:deactivate'),
    getPublisherInfo: () => ipcRenderer.invoke('license:getPublisherInfo'),
  },
});

// Also expose as __electronAPI for the injected JS
contextBridge.exposeInMainWorld('__electronAPI', {
  // meta: 딥링크 객체 { kind:'chat'|'mail', roomId, msgId, parentId, emailId }.
  // 하위호환을 위해 문자열(roomId)도 그대로 전달(main 에서 정규화).
  showNotification: (title, body, meta) => {
    ipcRenderer.send('show-notification', { title, body, meta });
  },
  updateBadge: (count) => {
    ipcRenderer.send('update-badge', count);
  },
});
