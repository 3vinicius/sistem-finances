export interface IDataValue {
    dates?: string[],
    valor?: number[]
}

export interface IGraphs {
    [key: string]: IDataValue
}
