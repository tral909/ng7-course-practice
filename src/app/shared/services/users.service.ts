import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {

    private userUri: string = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {}

    getUserByEmail(email: string) {
        return this.http.get(this.userUri + `?email=${email}`)
    }

    createNewUser(user: User) {
        return this.http.post(this.userUri, user);
    }
}