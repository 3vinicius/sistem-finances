import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { URL } from '../../../shared/const';
import { ICliente } from '../../../interfaces/ICliente';
import { ICRUD } from '../../../interfaces/ICRUD';
import { IClienteNomeId } from '../../../interfaces/IClienteNomeId';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.AUTH;

    constructor(private http: HttpClient) {
    }

    login(login: string, password: string): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };
        const body = { login, password };
        return this.http.post<any>(`${this.baseUrl}${this.path}`, body, { headers });
    }
}
