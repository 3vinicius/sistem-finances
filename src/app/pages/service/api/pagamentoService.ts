import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import { URL } from '../../../shared/const';
import { ICRUD } from '../../../interfaces/ICRUD';
import { IPagamento } from '../../../interfaces/IPagamento';


@Injectable({
    providedIn: 'root'
})
export class PagamentoService implements ICRUD<IPagamento>{
    private baseUrl = URL.BASE_URL
    private path = URL.PATH.PAGAMENTOS

    constructor(private http: HttpClient, private datePipe: DatePipe) {
    }

    get(){
        return this.http.get<IPagamento[]>(`${this.baseUrl}${this.path}`)
    }

    getId(id:number){
        return this.http.get<IPagamento>(`${this.baseUrl}${this.path}?id=${id}`)
    }

    post(pagamento:IPagamento ){
        return this.http.post<IPagamento>(`${this.baseUrl}${this.path}`, pagamento)
    }

    put(id: number, pagamento:IPagamento ){
        return this.http.put<IPagamento>(`${this.baseUrl}${this.path}`, pagamento)
    }

    delete(id:number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`)
    }

    getNomeCpf(nome:string, cpf:string){
        return this.http.get<IPagamento[]>(`${this.baseUrl}${this.path}?nome=${nome}&cpf=${cpf}`)
    }

}
