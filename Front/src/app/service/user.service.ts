import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map  } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get('http://localhost:3000/users/getUsers')
            .map(res => res);
    }

    createUser(user) {
        return this.http.post('http://localhost:3000/users/register', user)
        .map(res => res);
    }
    loginUser(user) {
        return this.http.post('http://localhost:3000/users/login', user)
        .map(res => res);
    }


    deleteUser(user) {
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id);
    }
}
