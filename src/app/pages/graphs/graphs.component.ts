import { Component, OnInit } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { ChartModule} from 'primeng/chart';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IGraphs } from '../../interfaces/IGraphs';
import { GraphsService } from '../service/api/graphsService';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductService } from '../service/product.service';






@Component({
    selector: 'app-graphs',
    standalone: true,
    imports: [
        ChartModule,
        FluidModule,
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
    ],
    templateUrl: './graphs.component.html',
    providers: [MessageService, ProductService, ChartModule, FluidModule,  ConfirmationService, GraphsService],
    styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit {
    dataGraph!: IGraphs;
    lineData!: any;

    comprasPie: any;
    comprasPieOptions: any;
    lineOptions: any;
    private documentStyle!: CSSStyleDeclaration;
    private textColorSecondary!: string;
    private surfaceBorder!: string;
    private textColor!: string;
    pagamentosPie!: any;
    pagamentosPieOptions!: any;
    pagamentosCompraslineData!: any;
    pagamentosCompraslineDataOptions!: any;

    constructor(
        private graphsService: GraphsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
    }

    ngOnInit(): void {
         this.buscarDataGraficos();
    }

    private buscarDataGraficos() {
        this.graphsService.buscarDataGraficos().subscribe({
            next: (data) => {
                this.dataGraph = data;
                this.construirGraficos()
            },
            error: (error) => {
                console.error(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.message
                });
            }
        });
    }

    construirGraficos() {
        this.documentStyle = getComputedStyle(document.documentElement);
        this.textColor = this.documentStyle.getPropertyValue('--text-color');
        this.textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
        this.surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
        this.totalClienteChart();
        this.pagamentosComprasChart()
        this.quitadosPier();
        this.compensadosPier()
    }

    totalClienteChart() {

        this.lineData = {
            labels: this.dataGraph['Total clientes'].dates,
            datasets: [
                {
                    label: 'Total Clientes',
                    data: this.dataGraph['Total clientes'].valor,
                    fill: false,
                    backgroundColor: this.documentStyle.getPropertyValue('--p-indigo-400'),
                    borderColor: this.documentStyle.getPropertyValue('--p-indigo-400'),
                    tension: 0.4
                },
            ]
        };
        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    pagamentosComprasChart() {

        this.pagamentosCompraslineData = {
            labels: this.dataGraph['Total compras'].dates,
            datasets: [
                {
                    label: 'Total Compras',
                    data: this.dataGraph['Total compras'].valor,
                    fill: false,
                    backgroundColor: this.documentStyle.getPropertyValue('--p-emerald-400'),
                    borderColor: this.documentStyle.getPropertyValue('--p-emerald-400'),
                    tension: 0.4
                },
                {
                    label: 'Total Pagamentos',
                    data: this.dataGraph['Total pagamentos'].valor,
                    fill: false,
                    backgroundColor: this.documentStyle.getPropertyValue('--p-emerald-200'),
                    borderColor: this.documentStyle.getPropertyValue('--p-emerald-200'),
                    tension: 0.4
                },
            ]
        };
        this.pagamentosCompraslineDataOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    quitadosPier() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.comprasPie = {
            labels: ['Quitadas', 'Não Quitadas'],
            datasets: [
                {
                    data: [this.dataGraph['Total compras quitadas'].valor!.reduce((a, v) => a+v),this.dataGraph['Total compras não quitadas'].valor!.reduce((a, v) => a+v)],
                    backgroundColor: [documentStyle.getPropertyValue('--p-indigo-500'), documentStyle.getPropertyValue('--p-purple-500'), documentStyle.getPropertyValue('--p-teal-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-indigo-400'), documentStyle.getPropertyValue('--p-purple-400'), documentStyle.getPropertyValue('--p-teal-400')]
                }
            ]
        };

        this.comprasPieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    compensadosPier() {
        this.pagamentosPie = {
            labels: ['Compensado', 'Não Compensado'],
            datasets: [
                {
                    data: [this.dataGraph['Total pagamentos compensados'].valor!.reduce((a, v) => a+v),this.dataGraph['Total pagamentos não compensados'].valor!.reduce((a, v) => a+v)],
                    backgroundColor: [this.documentStyle.getPropertyValue('--p-teal-500'), this.documentStyle.getPropertyValue('--p-orange-500')],
                    hoverBackgroundColor: [this.documentStyle.getPropertyValue('--p-teal-400'), this.documentStyle.getPropertyValue('--p-orange-400')]
                }
            ]
        };
        this.pagamentosPieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: this.textColor
                    }
                }
            }
        };
    }

}
