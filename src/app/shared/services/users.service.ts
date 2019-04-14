import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { User } from '../models/user.model';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {}

    getUserByEmail(email: string) {
        return this.http.get(`http://localhost:3000/users?email=${email}`)
            
          
    }
}