import { Component, Input } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../service/api/dashboardService';
import { ICompras } from '../../../interfaces/ICompras';

@Component({
    standalone: true,
    selector: 'app-compras-recentes',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Vendas Recentes</div>
        <p-table [value]="listaCompras" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th>
                        Id
                    </th>
                    <th style="min-width:10rem">
                        Descrição
                    </th>
                    <th pSortableColumn="nome" >
                        Cliente
                        <p-sortIcon field="nome" />
                    </th>
                    <th pSortableColumn="valor" >
                        Valor
                        <p-sortIcon field="valor" />
                    </th>
                    <th pSortableColumn="dataPrevPagamento" style="min-width: 8rem">
                        Previsão de Pagamento
                        <p-sortIcon field="dataPrevPagamento"/>
                    </th>
                    <th pSortableColumn="produto" style="min-width:10rem">
                        Produto
                        <p-sortIcon field="produto"/>
                    </th>
                    <th style="min-width:10rem">
                        Quitado
                    </th>
                    <th pSortableColumn="total" style="min-width:10rem">
                        Total
                        <p-sortIcon field="total" />
                    </th>
                </tr>
            </ng-template>
            <ng-template #body let-compras>
                <tr>
                    <td >{{ compras.id }}</td>
                    <td>{{ compras.descricao }}</td>
                    <td ><p-button label="{{ compras.idCliente.nome }}" icon="pi pi-user" /></td>
                    <td>{{ compras.valor }}</td>
                    <td>{{ compras.dataPrevPagamento }}</td>
                    <td>{{ compras.produto }}</td>
                    <td>
                        <p-button class="custom-disabled" [disabled]="true"  *ngIf="compras.quitado!; else comprasNotCompensado" label="SIM" severity="success" />
                        <ng-template #comprasNotCompensado>
                            <p-button class="custom-disabled" [disabled]="true" label="NÃO" severity="danger"></p-button>
                        </ng-template>
                    </td>
                    <td>{{ compras.total }}</td>
                </tr>
            </ng-template>

        </p-table>
    </div>`,
    providers: [DashboardService]
})
export class ComprasRecentes {
    @Input() listaCompras!: ICompras[];
}
