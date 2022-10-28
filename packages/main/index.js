import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import channels from '../shared/lib/ipc-channels'
import { init as initModules } from './lib/module-manager'

// modules
import ConfigModule from './modules/config'
import DB from './modules/db'
const appRoot = path.resolve(__dirname, '..')

const rendererDistPath = path.join(appRoot, 'renderer')
const preloadDistPath = path.join(appRoot, 'preload')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null

// Quit when all windows are closed
app.on('window-all-closed', () => {
   app.quit()
})

// This method will be called when Electron has finished its
// initialization and ready to create browser windows.
app.on('ready', async () => {
   // Create the browser window
   mainWindow = new BrowserWindow({
      title: 'Luka',
      width: 1235,
      height: 700,
      minWidth: 1000,
      minHeight: 550,
      autoHideMenuBar: true,
      titleBarStyle: 'hiddenInset', // MacOS polished window
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         autoplayPolicy: 'no-user-gesture-required',
         webSecurity: process.env.VITE_DEV_SERVER_URL == null,
         preload: path.join(preloadDistPath, 'index.js')
      }
   })

   mainWindow.maximize()
   // Open dev tools if the app runs in debug or development mode

   if (
      process.argv.includes('--devtools') ||
      process.env.NODE_ENV === 'development' ||
      process.env.VITE_DEV_SERVER_URL
   ) {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
   }

   mainWindow.on('closed', () => {
      // Dereference the window object
      mainWindow = null
   })

   // Prevent webContents from opening new windows (e.g ctrl-click on link)
   mainWindow.webContents.setWindowOpenHandler(() => {
      return { action: 'deny' }
   })

   // the url of the html file
   let url

   if (process.env.VITE_DEV_SERVER_URL) {
      url = `${process.env.VITE_DEV_SERVER_URL}`
   } else {
      url = `file://${rendererDistPath}/index.html`
   }

   mainWindow.loadURL(url)

   // only show the window when the app is ready , this will prevent the white flash problem
   ipcMain.on(channels.APP_READY, () => {
      if (mainWindow) {
         mainWindow.show()
      }
   })

   // for minimizing the window from the renderer
   ipcMain.on(channels.WINDOW_MINIMIZE, () => {
      if (mainWindow) {
         mainWindow.minimize()
      }
   })

   // for maximizing the window from the renderer
   ipcMain.on(channels.WINDOW_MAXIMIZE, () => {
      if (mainWindow) {
         mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize()
      }
   })

   // for closing the window from the renderer
   ipcMain.on(channels.WINDOW_CLOSE, () => {
      if (mainWindow) {
         app.exit(0)
      }
   })

   mainWindow.on('maximize', event => {
      // tell the ui to change the icon to minimize
      mainWindow.webContents.send('size_changed', {
         maximized: true
      })
   })

   mainWindow.on('unmaximize', event => {
      // tell the ui to change the icon to maximize
      mainWindow.webContents.send('size_changed', {
         maximized: false
      })
   })

   const gotTheLock = app.requestSingleInstanceLock()

   app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
         if (mainWindow.isMinimized()) mainWindow.restore()
         mainWindow.focus()
      }
   })

   if (!gotTheLock) {
      app.quit()
   }

   // init the db module first

   let db
   ;(async () => {
      db = new DB()
      await db.init()
      initOtherModules(db)
   })()

   // init other modules

   async function initOtherModules(db) {
      if (db.loaded) {
         initModules(new ConfigModule())
      } else {
         setTimeout(() => initOtherModules(db), 500)
      }
   }
})
