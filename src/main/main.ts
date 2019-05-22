import {App, BrowserWindow} from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import * as url from 'url';
import * as path from 'path';

const isDevelopment = process.execPath.match(/[\\/]electron/);

export default class Main
{
  private static application: App;
  private static window: BrowserWindow | null;

  /**
   * Initialise new main process
   * @param application
   */
  public static initialize(application: App): void
  {
    Main.application = application;
    Main.application.on('activate', Main.onActivate);
    Main.application.on('ready', Main.onReady);
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
  }

  /**
   * Handles the app's 'activate' event.
   * Emitted when the application is activated (macOS only).
   */
  protected static async onActivate(): Promise<void>
  {
    if (Main.window === null) {
      Main.window = await Main.createWindow();
    }
  }

  /**
   * Handles the app's 'ready' event.
   * Emitted when Electron has finished initializing.
   */
  protected static async onReady(): Promise<void>
  {
    Main.window = await Main.createWindow();
  }

  /**
   * Handles the app's 'window-all-closed' event.
   * Emitted when all windows have been closed.
   */
  private static onWindowAllClosed(): void
  {
    // Do not quit process, on Mac processes stay alive unless closed explicit.
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  protected static async createWindow(): Promise<BrowserWindow>
  {
    const window = new BrowserWindow({
      width: 1000,
      webPreferences: {
        nodeIntegration: true
      },
      titleBarStyle: 'hidden'
    });
    const target: string = isDevelopment
        ? 'http://localhost:9080'
        : url.format({pathname: path.join(__dirname, 'index.html'), protocol: 'file', slashes: true});

    window.loadURL(target);
    window.on('closed', Main.onWindowClosed);
    window.webContents.on('devtools-opened', Main.onWindowDevtoolsOpened);

    if (isDevelopment) {
      await installExtension(VUEJS_DEVTOOLS);
      window.webContents.on('did-frame-finish-load', () => {
        window.webContents.openDevTools();
      });
    }

    return window;
  }

  /**
   * Handles the window's 'close' event.
   * Emitted when the window is going to be closed.
   */
  protected static onWindowClosed(): void
  {
    Main.window = null;
  }

  /**
   * Handles main window's 'devtools-opened' event.
   * Emitted when DevTools is opened.
   *
   * Returns focus to the main window
   */
  protected static onWindowDevtoolsOpened(): void
  {
    if (!Main.window) {
      return;
    }

    Main.window.focus();
    setImmediate(() => {
      if (Main.window) {
        Main.window.focus();
      }
    });
  }
}
