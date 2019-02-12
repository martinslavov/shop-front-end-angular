import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IAppConfig } from '../_models/app-config';
import { environment } from './env';

@Injectable({ providedIn: 'root'})
export class AppConfig {

    static settings: IAppConfig;

    constructor() {}

    load() {
    	AppConfig.settings = environment;
    }
}