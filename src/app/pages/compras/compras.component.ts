import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
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
import { Product, ProductService } from '../service/product.service';
import { ClienteService } from '../service/api/clienteService';
import { ICliente } from '../../interfaces/ICliente';
import { Utils } from '../../shared/Utils';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Toast } from 'primeng/toast';
import { IPagamentoCliente } from '../../interfaces/IPagamentoCliente';
import { IClienteNomeId } from '../../interfaces/IClienteNomeId';
import { PagamentoService } from '../service/api/pagamentoService';
import { ComprasService } from '../service/api/comprasService';
import { ICompras } from '../../interfaces/ICompras';
import { ICompraCliente } from '../../interfaces/ICompraCliente';


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-compras',
    standalone: true,
    imports: [
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
        Toast
    ],
    providers: [MessageService, ProductService, ConfirmationService, ClienteService, provideNgxMask()],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent implements OnInit{
    compraDialog: boolean = false;
    clienteDialog: boolean = false;
    @ViewChild('dt') dt!: Table;

    cols!: Column[];
    listaCompras = signal<ICompraCliente[]>([]);
    util = new Utils();


    compra: ICompraCliente = {};
    product!: Product;
    listaClienteNomeId: IClienteNomeId[] = []

    submitted: boolean = false;
    statuses!: any[];
    selectEnable=  true;

    constructor(
        private comprasService: ComprasService,
        private clienteService: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.buscarCompras();
        this.buscarListaClienteNomeId()
    }

    buscarListaClienteNomeId(){
        this.clienteService.getClienteNomeId().subscribe({
            next: (value) => {
                this.listaClienteNomeId = value;
            },
            error: (err) => {
                console.error(err);
            }
        })
    }

    buscarCompras() {
        console.log("buscar compras")
        this.comprasService.get().subscribe({
            next: (value) => {
                console.log(value)
                this.listaCompras.set(value);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.compra = {};
        this.submitted = false;
        this.selectEnable = true
        this.compraDialog = true;
    }

    editCompra(pagamento: ICompraCliente) {
        this.selectEnable = false;
        this.compra = { ...pagamento };
        this.compraDialog = true;
    }

    hideDialogCompra() {
        this.compraDialog = false;
        this.submitted = false;
        this.compra = {};
    }

    hideDialogCliente(compra:  ICompraCliente) {
        this.clienteDialog = true;
        this.compra = compra;
    }

    deleteCompra(compra: ICompraCliente) {
        // this.confirmationService.confirm({
        //     message: 'Você quer excluir a compra de ' + compra.produto + '?',
        //     header: 'Confirme',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.comprasService.delete(compra.idCompra!).subscribe({
        //             next: value => {
        //                 this.buscarCompras();
        //                 this.messageService.add({
        //                     severity: 'success',
        //                     summary: 'Sucesso',
        //                     detail: 'pagamento excluido',
        //                     life: 3000
        //                 });
        //             },
        //             error: err => {
        //                 console.error(err)
        //                 this.messageService.add({
        //                     severity: 'error',
        //                     summary: 'Error',
        //                     detail: err.error.message})
        //
        //             }
        //         })
        //     }
        // });
    }

    // updateCompra(compra:  ICompraCliente){
    //     let id:number = compra.idCompra!
    //     this.comprasService.put(id,compra).subscribe({
    //         next: value => {
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Sucesso',
    //                 detail: 'Pagamento Atualizado',
    //                 life: 3000
    //             });
    //             this.buscarCompras();
    //             this.hideDialogPagamento();
    //         },
    //         error: err => {
    //             console.error(err)
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Error',
    //                 detail: err.error.message
    //             });
    //         }
    //     })
    // }

    // cadastrarCompra(){
    //     this.comprasService.post(this.contruirPagamento(this.pagamento)).subscribe({
    //         next: value => {
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Sucesso',
    //                 detail: 'Pagamento Cadastrado',
    //                 life: 3000
    //             });
    //             this.buscarCompras();
    //             this.hideDialogPagamento();
    //         },
    //         error: value => {
    //             console.error(value)
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Error',
    //                 detail: value.error.message})
    //         }
    //     });
    // }

    // savePagamento() {
    //     this.submitted = true;
    //     if (this.pagamento.id && this.pagamento.descricao?.trim() && this.pagamento.valor) {
    //         if (this.pagamento.idCompra){
    //             this.updateCompra(this.pagamento)
    //         } else {
    //             this.cadastrarCompra()
    //         }
    //     }
    //
    // }

    // contruirPagamento(compraCliente:  ICompraCliente): {
    //     valor: number | undefined;
    //     descricao: string | undefined;
    //     cliente: { id: number }
    // } {
    //     return {
    //         valor: compraCliente.valor,
    //         descricao: compraCliente.descricao,
    //         cliente: {id: compraCliente.i!}
    //     }
    // }
}
