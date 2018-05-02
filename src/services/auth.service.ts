import {Observable} from 'rxjs/Observable';
import {LoginModel} from '../models/login.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppUser} from '../models/appUser.mode';


@Injectable()
export class AuthService {

  private baseURL = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) {

  }

  login(login: LoginModel): Observable<any> {
    return this.http.post(this.baseURL + 'login', login);
  }

  setLoggedUser(userInfo: AppUser) {

  }

}
