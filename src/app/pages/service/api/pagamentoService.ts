import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { URL } from '../../../shared/const';
import { ICRUD } from '../../../interfaces/ICRUD';
import { IPagamento } from '../../../interfaces/IPagamento';
import { IPagamentoCliente } from '../../../interfaces/IPagamentoCliente';
import { IPagamentoUpdate } from '../../../interfaces/IPagamentoUpdate';


@Injectable({
    providedIn: 'root'
})
export class PagamentoService implements ICRUD<IPagamento> {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.PAGAMENTOS;

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<IPagamento[]>(`${this.baseUrl}${this.path}/all`);
    }

    getId(id: number) {
        return this.http.get<IPagamento>(`${this.baseUrl}${this.path}?id=${id}`);
    }

    post(object: IPagamentoUpdate): Observable<IPagamentoCliente> {
        const headers = { 'Content-Type': 'application/json' };
        return this.http.post<IPagamentoCliente>(`${this.baseUrl}${this.path}`, object, { headers });
    }

    put(id: number, pagamento: IPagamento) {
        return this.http.put<IPagamento>(`${this.baseUrl}${this.path}`, pagamento);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`);
    }
}
