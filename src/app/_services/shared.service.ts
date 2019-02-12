import { Component, Injectable,Input,Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

	private langSource = new BehaviorSubject<string>("en");
    currentLang = this.langSource.asObservable();

	constructor() { }

    changeMessage(lang:string){
        this.langSource.next(lang);
    }
}