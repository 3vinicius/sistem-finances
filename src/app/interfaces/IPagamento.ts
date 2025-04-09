export interface IPagamento {
    id: number,
    dataPagamento: Date,
    valor: number,
    descricao: string,
    compensado: boolean
}
