import { ICliente } from './ICliente';

export interface IPagamento {
    idPagamento?: number,
    dataPagamento?: string,
    valor?: number,
    descricao?: string,
    compensado?: boolean,
    cliente?: ICliente,

}
