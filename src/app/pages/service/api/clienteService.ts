import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { URL } from '../../../shared/const';
import { ICliente } from '../../../interfaces/ICliente';
import { ICRUD } from '../../../interfaces/ICRUD';


@Injectable({
    providedIn: 'root'
})
export class ClienteService implements ICRUD<ICliente>{
    private baseUrl = URL.BASE_URL
    private path = URL.PATH.CLIENTES

    constructor(private http: HttpClient) {
    }

    get(){
        return this.http.get<ICliente[]>(`${this.baseUrl}${this.path}/all`)
    }

    getId(id:number){
        return this.http.get<ICliente>(`${this.baseUrl}${this.path}?id=${id}`)
    }

    post(cliente:ICliente ){
        const headers = { 'Content-Type': 'application/json' };
        return this.http.post<ICliente>(`${this.baseUrl}${this.path}`, cliente, { headers } )
    }

    put(id: number, cliente:ICliente ){
        return this.http.put<ICliente>(`${this.baseUrl}${this.path}`, cliente)
    }

    delete(id:number) {
        return this.http.delete<void>(`${this.baseUrl}${this.path}?id=${id}`)
    }


    getNomeCpf(nome:string, cpf:string){
        return this.http.get<ICliente[]>(`${this.baseUrl}${this.path}?nome=${nome}&cpf=${cpf}`)
    }

}
