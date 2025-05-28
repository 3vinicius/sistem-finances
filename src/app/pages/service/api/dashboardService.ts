import {Injectable} from '@angular/core';
import { URL } from '../../../shared/const';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorizationService';

@Injectable({
    providedIn: 'root'
})
export class DashboardService  {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.DASHBOARD;
    private headers = AuthorizationService.headerToken();

    constructor(private http: HttpClient) {}

    public buscarDataDashboard() {
        return this.http.get<any>(`${this.baseUrl}${this.path}`, { headers: this.headers });
    }

}
