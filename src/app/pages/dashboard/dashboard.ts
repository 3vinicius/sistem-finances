import { Component, EventEmitter, Output } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { ComprasRecentes } from './components/compras-recentes.component';
import { GraficosVendas } from './components/graficos-vendas.component';
import { DashboardService } from '../service/api/dashboardService';
import {IDashboard} from '../../interfaces/IDashboard';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, ComprasRecentes, GraficosVendas, NgIf],
    providers: [DashboardService],
    standalone: true,
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" [dadosWid]="dashboardData" />
            <div class="col-span-12 xl:col-span-6" *ngIf="dashboardData">
                <app-compras-recentes [listaCompras]="dashboardData.listaCompra" />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-grafico-vendas [dadosWid]="dashboardData.dateValorGraphDTO" />
            </div>
        </div>
    `
})
export class Dashboard {
    dashboardData! : IDashboard;


    constructor(private dashboardService: DashboardService) {

        this.dashboardService.buscarDataDashboard().subscribe({
            next: data => {
                this.dashboardData = data;
            }
        });
    }
}
