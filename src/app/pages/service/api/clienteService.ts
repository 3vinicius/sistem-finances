import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { URL } from '../../../shared/const';
import { ICliente } from '../../../interfaces/ICliente';
import { ICRUD } from '../../../interfaces/ICRUD';
import { IClienteNomeId } from '../../../interfaces/IClienteNomeId';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorizationService';


@Injectable({
    providedIn: 'root'
})
export class ClienteService implements ICRUD<ICliente> {
    private baseUrl = URL.BASE_URL;
    private path = URL.PATH.CLIENTES;
    private headers = AuthorizationService.headerToken();
    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<ICliente[]>(`${this.baseUrl}${this.path}/all`, {headers : this.headers});
    }

    getId(id: number) {
        return this.http.get<ICliente>(`${this.baseUrl}${this.path}?id=${id}`,{headers : this.headers});
    }

    post(cliente: ICliente): Observable<ICliente> {
        return this.http.post<ICliente>(`${this.baseUrl}${this.path}`, cliente, {headers : this.headers});
    }

    put(id: number, cliente: ICliente) {
        return this.http.put<ICliente>(`${this.baseUrl}${this.path}`, cliente, {headers : this.headers});
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`, {headers : this.headers});
    }

    getClienteNomeId() {
        return this.http.get<IClienteNomeId[]>(`${this.baseUrl}${this.path}/all/idName`, {headers : this.headers});
    }

    getNomeCpf(nome: string, cpf: string) {
        return this.http.get<ICliente[]>(`${this.baseUrl}${this.path}?nome=${nome}&cpf=${cpf}`, {headers : this.headers});
    }
}
