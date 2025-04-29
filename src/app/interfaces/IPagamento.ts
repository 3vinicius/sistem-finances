import { ICliente } from './ICliente';

export interface IPagamento {
    id?: number,
    dataPagamento?: string,
    valor?: number,
    descricao?: string,
    compensado?: boolean,
    cliente?: ICliente,
}
