const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const APP_URL = 'https://studymind.duckdns.org/';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#f6f8f7',
    title: 'StudyMind UG',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  });

  win.once('ready-to-show', () => win.show());

  win.loadURL(APP_URL);

  // Open any link that tries to open a new window (e.g. target=_blank)
  // in the user's default browser instead of a new Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Keep navigation inside the app for the same site; send anything
  // external to the default browser.
  win.webContents.on('will-navigate', (event, url) => {
    try {
      const target = new URL(url);
      const home = new URL(APP_URL);
      if (target.hostname !== home.hostname) {
        event.preventDefault();
        shell.openExternal(url);
      }
    } catch (e) {
      // ignore malformed URLs
    }
  });

  return win;
}

// Simple app menu with reload/back/forward/devtools, no default Electron demo items.
function buildMenu(win) {
  const template = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        {
          label: 'Back',
          accelerator: 'Alt+Left',
          click: () => { if (win.webContents.canGoBack()) win.webContents.goBack(); }
        },
        {
          label: 'Forward',
          accelerator: 'Alt+Right',
          click: () => { if (win.webContents.canGoForward()) win.webContents.goForward(); }
        },
        { type: 'separator' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Open in Browser',
          click: () => shell.openExternal(APP_URL)
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  const win = createWindow();
  buildMenu(win);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
