export interface Stock {
    date: Date;
    value: number;
}

export const STOCKS: Stock[] = [
    { date: new Date('2024-05-01'), value: 35 },
    { date: new Date('2024-06-01'), value: 81 },
    { date: new Date('2024-07-01'), value: 89 },
    { date: new Date('2024-08-01'), value: 88 },
    { date: new Date('2024-09-01'), value: 71 },
    { date: new Date('2024-09-30'), value: 102 },
    { date: new Date('2024-10-31'), value: 99 },
    { date: new Date('2024-11-30'), value: 71 },
    { date: new Date('2025-01-01'), value: 88 },
    { date: new Date('2025-02-01'), value: 65 },
    { date: new Date('2025-03-01'), value: 88 },
    { date: new Date('2025-04-01'), value: 93 },
    { date: new Date('2025-05-01'), value: 35 }
];
