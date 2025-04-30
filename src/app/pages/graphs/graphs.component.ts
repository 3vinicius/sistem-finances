import { Component, OnInit } from '@angular/core';
import { Fluid, FluidModule } from 'primeng/fluid';
import { ChartModule, UIChart } from 'primeng/chart';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IDataValue, IGraphs } from '../../interfaces/IGraphs';
import { GraphsService } from '../service/api/graphsService';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Toast, ToastModule } from 'primeng/toast';
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
import { DatePickerModule } from 'primeng/datepicker';
import { ProductService } from '../service/product.service';
import { ClienteService } from '../service/api/clienteService';
import { provideNgxMask } from 'ngx-mask';


import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';





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
        DatePickerModule
    ],
    templateUrl: './graphs.component.html',
    providers: [MessageService, ProductService, ConfirmationService, GraphsService, provideNgxMask()],
    styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit {
    dataGraph!: IGraphs;
    lineData!: any;
    aapl: any;

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line!: d3Shape.Line<[number, number]>;

    constructor(
        private graphsService: GraphsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.width = 900  - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit(): void {
        this.buscarDataGraficos();
    }

    construirLineChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                    tension: 0.4
                }
            ]
        };
    }

    private buscarDataGraficos() {
        this.graphsService.buscarDataGraficos().subscribe({
            next: (data) => {
                this.dataGraph = data;
                console.log(this.dataGraph);
                this.lineData = this.dataGraph['Total clientes'].map((d: any) => ({
                    data: new Date(d.data), // Converte para Date, se necessário
                    valor: Number(d.valor) // Garante que seja um número
                }));


                this.criandoLineChart()

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

    private criandoLineChart() {
        this.svg = d3
            .select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');


        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);

        // Define os domínios com base nos dados
        this.x.domain(
            d3Array.extent(this.lineData, (d) => {
                console.log(d.data)
                return d.data;
            }) as [Date, Date]
        );
        this.y.domain(d3Array.extent(this.lineData, (d:number) => {
            console.log(d.valor)
            return d.valor;
        }) as [number, number]);

        this.svg
            .append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg
            .append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

        // Cria a linha com base nos dados
        const line = d3Shape
            .line<any>()
            .x((d) => this.x(d.data))
            .y((d) => this.y(d.valor));

        this.svg
            .append('path')
            .datum(this.lineData) // Passa os dados para o path
            .attr('class', 'line')
            .attr('d', line);
    }
}
