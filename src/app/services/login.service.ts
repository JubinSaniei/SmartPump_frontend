import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Settings } from '../shared/settings';


@Injectable()
export class LoginService {
    private header: HttpHeaders;
    constructor(private http: HttpClient) {
        this.header = new HttpHeaders().set('x-auth-token', window.sessionStorage.getItem('token'));
    }

    register(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/register'), data, { responseType: 'text' });
    }
    login(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/login'), data, { responseType: 'text' });
    }
    userData(id): Observable<any> {
        return this.http.get(Settings.getSettings().apiUrl.concat(`user/userData/${id}`), { responseType: 'text' });
    }
    deposit(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/deposit'), data, { responseType: 'text' });
    }
    withdraw(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/withdraw'), data, { responseType: 'text' });
    }
    update(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/update'), data, { responseType: 'text' });
    }
    resetPassword(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/resetPassword'), data, { responseType: 'text' });
    }
    accountDelete(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/accountDelete'), data, { responseType: 'text' });
    }
}

