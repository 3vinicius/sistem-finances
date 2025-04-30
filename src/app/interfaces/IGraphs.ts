export interface IDataValue {
    data?: string,
    valor?: number
}

export interface IGraphs {
    [key: string]: IDataValue[]
}
