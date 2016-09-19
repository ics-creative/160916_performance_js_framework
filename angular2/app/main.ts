// 必要なJSファイルを読み込んでおく

declare function require(string):any;
require('../node_modules/core-js/client/shim.min.js');
require('../node_modules/zone.js/dist/zone.js');
require('../node_modules/reflect-metadata/Reflect.js');

// ここからAngular2の世界
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module'
import {enableProdMode} from '@angular/core';
enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
