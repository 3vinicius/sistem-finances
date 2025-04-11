import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
import { IPagamentoCliente } from '../../interfaces/IPagamentoCliente';
import { Utils } from '../../shared/Utils';
import { Product, ProductService } from '../service/product.service';
import { PagamentoService } from '../service/api/pagamentoService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClienteService } from '../service/api/clienteService';
import { IClienteNomeId } from '../../interfaces/IClienteNomeId';
import { SelectModule } from 'primeng/select';
import { IPagamento } from '../../interfaces/IPagamento';


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-pagamentos',
    imports: [SelectModule,Button, ConfirmDialog, Dialog, FormsModule, IconField, InputIcon, InputText, NgIf, TableModule, Toast, Toolbar],
    providers: [MessageService, ProductService, ConfirmationService, ClienteService, provideNgxMask()],
    templateUrl: './pagamentos.component.html',
    styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent implements OnInit {
    pagamentoDialog: boolean = false;
    clienteDialog: boolean = false;
    @ViewChild('dt') dt!: Table;

    cols!: Column[];
    listaPagamentos = signal<IPagamentoCliente[]>([]);
    util = new Utils();


    pagamento: IPagamentoCliente = {};
    product!: Product;
    listaClienteNomeId: IClienteNomeId[] = []

    submitted: boolean = false;
    statuses!: any[];
    selectEnable=  true;

    constructor(
        private pagamentoService: PagamentoService,
        private clienteService: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.buscarpagamentos();
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

    buscarpagamentos() {
        this.pagamentoService.get().subscribe({
            next: (value) => {
                this.listaPagamentos.set(value);
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
        this.pagamento = {};
        this.submitted = false;
        this.selectEnable = true
        this.pagamentoDialog = true;
    }

    editPagamento(pagamento: IPagamentoCliente) {
        this.selectEnable = false;
        this.pagamento = { ...pagamento };
        this.pagamentoDialog = true;
    }

    hideDialogPagamento() {
        this.pagamentoDialog = false;
        this.submitted = false;
        this.pagamento = {};
    }

    hideDialogCliente(pagamento: IPagamentoCliente) {
        this.clienteDialog = true;
        this.pagamento = pagamento;
    }

    deletePagamento(pagamento: IPagamentoCliente) {
        this.confirmationService.confirm({
            message: 'Você quer excluir o pagamento de ' + pagamento.nome + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.pagamentoService.delete(pagamento.id!).subscribe({
                    next: value => {
                        this.buscarpagamentos();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'pagamento excluido',
                            life: 3000
                        });
                    },
                    error: err => {
                        console.error(err)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message})

                    }
                })
            }
        });
    }

    updatePagamento(pagamento: IPagamentoCliente){
        let id:number = pagamento.id!
        this.pagamentoService.put(id,pagamento).subscribe({
            next: value => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Pagamento Atualizado',
                    life: 3000
                });
                this.buscarpagamentos();
                this.hideDialogPagamento();
            },
            error: err => {
                console.error(err)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.message})
            }
        })
    }

    cadastrarPagamento(){
        this.pagamentoService.post(this.contruirPagamento(this.pagamento)).subscribe({
            next: value => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Pagamento Cadastrado',
                    life: 3000
                });
                this.buscarpagamentos();
                this.hideDialogPagamento();
            },
            error: value => {
                console.error(value)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: value.error.message})
            }
        });
    }

    savePagamento() {
        this.submitted = true;
        if (this.pagamento.id && this.pagamento.descricao?.trim() && this.pagamento.valor) {
            if (this.pagamento.idPagamento){
                this.updatePagamento(this.pagamento)
            } else {
                this.cadastrarPagamento()
            }
        }

    }

    contruirPagamento(pagamento: IPagamentoCliente): {
        valor: number | undefined;
        descricao: string | undefined;
        cliente: { id: number }
    } {
        return {
            valor: pagamento.valor,
            descricao: pagamento.descricao,
            cliente: {id: pagamento.id!}
        }
    }
}
