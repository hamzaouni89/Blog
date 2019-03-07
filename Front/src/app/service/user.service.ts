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
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getUsers', { headers: header })
            .map(res => res);
    }

    createUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/register', user , { headers: header })
        .map(res => res);
    }
 

    loginUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/login', user , { headers: header })
        .map(res => res);
    }


    deleteUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id, { headers: header });
    }
}
