import {Injectable} from '@angular/core';
import { URL } from '../../../shared/const';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class DashboardService  {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.DASHBOARD;

    constructor(private http: HttpClient) {}

    public buscarDataDashboard() {
        return this.http.get<any>(`${this.baseUrl}${this.path}`)
    }

}
