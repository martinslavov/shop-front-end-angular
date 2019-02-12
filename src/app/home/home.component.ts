import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService,private _router: Router) {}

    ngOnInit() {

        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    test(){
    		this._router.navigate(['/home']);  
    }
}