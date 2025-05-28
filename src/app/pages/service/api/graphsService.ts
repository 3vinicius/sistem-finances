import {Injectable} from '@angular/core';
import { URL } from '../../../shared/const';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorizationService';

@Injectable({
    providedIn: 'root'
})
export class GraphsService  {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.GRAPHS;
    private headers = AuthorizationService.headerToken();

    constructor(private http: HttpClient) {}

    public buscarDataGraficos() {
        return this.http.get<any>(`${this.baseUrl}${this.path}`, { headers: this.headers });
    }

}
