import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (!environment.production) {
	enableProdMode();
	console.log("Production Mode");
}else{
	console.log("Development Mode");
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
