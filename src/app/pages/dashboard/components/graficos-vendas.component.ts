import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';



@Component({
    standalone: true,
    selector: 'app-grafico-vendas',
    imports: [ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Grafico de Vendas da semana</div>
        <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>`
})
export class GraficosVendas {
    private _dadosWid!: any;


    @Input()
    set dadosWid(value: any) {
        this._dadosWid = value;
        this.initChart();
    }

    arrayDates: string[] = []
    arrayValues : number[] = []

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor() {
    }

    ngOnInit() {

    }




    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        if (this._dadosWid) {
            this.arrayDates = this._dadosWid.dates || [];
            this.arrayValues = this._dadosWid.valor || [];
        }

        this.chartData = {
            labels: this.arrayDates,
            datasets: [
                {
                    type: 'bar',
                    label: 'Subscriptions',
                    backgroundColor: documentStyle.getPropertyValue('--p-emerald-400'),
                    data: this.arrayValues,
                    barThickness: this.arrayDates.length - (this.arrayDates.length * 0.2),
                },
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }


}
