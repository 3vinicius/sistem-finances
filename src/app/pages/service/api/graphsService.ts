import {Injectable} from '@angular/core';
import { URL } from '../../../shared/const';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class GraphsService  {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.GRAPHS;

    constructor(private http: HttpClient) {}

    public buscarDataGraficos() {
        return this.http.get<any>(`${this.baseUrl}${this.path}`)
    }

}
