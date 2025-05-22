import { ICompras } from './ICompras';
import { IDataValue } from './IGraphs';

export interface IDashboard {
   listaCompra: ICompras[];
   qtnClientesSemana: number;
   dashboard: Array<IMapDashboard>;
    dateValorGraphDTO : IDataValue
}

export interface IMapDashboard {
    [key: string]: number;
}
