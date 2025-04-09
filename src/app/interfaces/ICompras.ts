export interface ICompras {
    id: number,
    valor: number,
    descricao: string,
    dataPrevPagamento: Date,
    produto: string,
    dataCriacao: Date,
    quitado: boolean,
    total: number
}
