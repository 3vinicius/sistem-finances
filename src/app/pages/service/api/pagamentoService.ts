import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { URL } from '../../../shared/const';
import { ICRUD } from '../../../interfaces/ICRUD';
import { IPagamento } from '../../../interfaces/IPagamento';
import { IPagamentoCliente } from '../../../interfaces/IPagamentoCliente';
import { IpagamentoUpdate } from '../../../interfaces/IpagamentoUpdate';
import { AuthorizationService } from './authorizationService';

@Injectable({
    providedIn: 'root'
})
export class PagamentoService implements ICRUD<IPagamento> {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.PAGAMENTOS;
    private headers = AuthorizationService.headerToken();

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<IPagamento[]>(`${this.baseUrl}${this.path}/all`, { headers: this.headers });
    }

    getId(id: number) {
        return this.http.get<IPagamento>(`${this.baseUrl}${this.path}?id=${id}`, { headers: this.headers });
    }

    post(object: IpagamentoUpdate): Observable<IPagamentoCliente> {
        return this.http.post<IPagamentoCliente>(`${this.baseUrl}${this.path}`, object, { headers: this.headers });
    }

    put(id: number, pagamento: IPagamento) {
        return this.http.put<IPagamento>(`${this.baseUrl}${this.path}`, pagamento, { headers: this.headers });
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`, { headers: this.headers });
    }
}
