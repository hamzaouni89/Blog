import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    connectedUser: any;

    constructor(private http: HttpClient) {
        this.connectedUser = this.getDecodedToken();
    }

    getUsers() {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get('http://localhost:3000/users/getUsers', { headers: header })
            .map(res => res);
    }

    createUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/register', user, { headers: header })
            .map(res => res);
    }


    loginUser(user) {

        return this.http.post('http://localhost:3000/users/login', user)
            .map((res: any) => res);
    }


    deleteUser(user) {

        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id);
    }

    getToken(): string {

        return localStorage.getItem('token');
    }
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getDecodedToken() {
        if (localStorage.getItem('token')) {

            var decoded = jwt_decode(localStorage.getItem('token'));
            return decoded;
        }

    }

    getUser(ID) {
        return this.http.get('http://localhost:3000/users/getuser/ ' + ID);
    }

    UpdateUser(user) {
        let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post('http://localhost:3000/users/updateUser/' + user._id, user, { headers: header })
            .map(res => res);
    }
}
