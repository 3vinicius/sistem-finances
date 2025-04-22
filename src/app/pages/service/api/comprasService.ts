import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { URL } from '../../../shared/const';
import { ICliente } from '../../../interfaces/ICliente';
import { ICRUD } from '../../../interfaces/ICRUD';
import { ICompras } from '../../../interfaces/ICompras';
import { ICompraCliente } from '../../../interfaces/ICompraCliente';


@Injectable({
    providedIn: 'root'
})
export class ComprasService implements ICRUD<ICompras> {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.COMPRAS;

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<ICompraCliente[]>(`${this.baseUrl}${this.path}/all`);
    }

    getId(id: number) {
        return this.http.get<ICompras>(`${this.baseUrl}${this.path}?id=${id}`);
    }

    post(compra:ICompras): Observable<ICompras> {
        return this.http.post<ICompras>(`${this.baseUrl}${this.path}`, compra);
    }

    put(id: number, cliente: ICompras) {
        return this.http.put<ICompras>(`${this.baseUrl}${this.path}`, cliente);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`);
    }

    comprasIdCliente(id: number) {
        return this.http.get<ICompras[]>(`${URL.BASE_URL}${this.path}/cliente?id=${id}`);
    }

    comprasInterval(periodoInicial: Date, periodoFinal: Date) {
        return this.http.get<ICompras[]>(`${URL.BASE_URL}${this.path}/intervalo?periodoInicial=${periodoInicial}&periodoFinal=${periodoFinal}`);
    }
}
