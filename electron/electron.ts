import { app, BrowserWindow } from 'electron';
import Main from './initial';

app.allowRendererProcessReuse = true
Main.main(app, BrowserWindow);