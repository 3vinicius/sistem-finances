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
import { PagamentoService } from '../service/api/pagamentoService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClienteService } from '../service/api/clienteService';
import { IClienteNomeId } from '../../interfaces/IClienteNomeId';
import { SelectModule } from 'primeng/select';
import { IColumn } from '../../interfaces/IColumn';
import { IPagamentoUpdate } from '../../interfaces/IPagamentoUpdate';


@Component({
    selector: 'app-pagamentos',
    imports: [SelectModule,Button, ConfirmDialog, Dialog, FormsModule, IconField, InputIcon, InputText, NgIf, TableModule, Toast, Toolbar],
    providers: [MessageService, ConfirmationService, ClienteService, provideNgxMask()],
    templateUrl: './pagamentos.component.html',
    styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent implements OnInit {
    pagamentoDialog: boolean = false;
    clienteDialog: boolean = false;
    @ViewChild('dt') dt!: Table;

    cols: IColumn[] = [
        { field: 'id', header: 'Id' },
        { field: 'nome', header: 'Cliente' },
        { field: 'valor', header: 'Valor' },
        { field: 'descricao', header: 'Descrição' },
        { field: 'compensado', header: 'Compensado' },
        { field: 'dataPagamento', header: 'Data Pagamento' }
    ];
    listaPagamentos = signal<IPagamentoCliente[]>([]);
    util = new Utils();


    pagamento: IPagamentoCliente = {};
    listaClienteNomeId: IClienteNomeId[] = []

    submitted: boolean = false;
    statuses!: any[];
    selectEnable=  true;

    constructor(
        private pagamentoService: PagamentoService,
        private clienteService: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.pagamento = {};
    }

    exportCSV() {
        this.dt.exportFilename = "Relatorio de Pagamentos"
        this.dt.exportCSV({selectionOnly : false});
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
                Utils.redirecionarUsuarioNaoAutenticadoParaLogin(err, this.messageService);
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
                        Utils.mostrarMensagemDeSucesso("Pagamento excluido", this.messageService);
                    },
                    error: err => {
                        console.error(err)
                        Utils.mostrarMensagemDeErro(err.error.message, this.messageService);
                    }
                })
            }
        });
    }

    updatePagamento(pagamento: IPagamentoCliente){
        let id:number = pagamento.idPagamento!
        this.pagamentoService.put(id,pagamento).subscribe({
            next: value => {
                Utils.mostrarMensagemDeSucesso('Pagamento Atualizado', this.messageService);
                this.buscarpagamentos();
                this.hideDialogPagamento();
            },
            error: err => {
                console.error(err)
                Utils.mostrarMensagemDeErro(err.error.message, this.messageService);
            }
        })
    }

    cadastrarPagamento(){
        console.log(this.contruirPagamento(this.pagamento))
        this.pagamentoService.post(this.contruirPagamento(this.pagamento)).subscribe({
            next: value => {
                Utils.mostrarMensagemDeSucesso('Pagamento Cadastrado', this.messageService);
                this.buscarpagamentos();
                this.hideDialogPagamento();
            },
            error: value => {
                console.error(value)
                Utils.mostrarMensagemDeErro(value.error.message, this.messageService);
            }
        });
    }

    savePagamento() {
        this.submitted = true;
        console.log(this.pagamento)
        if (this.pagamento.id && this.pagamento.descricao?.trim() && this.pagamento.valor) {
            if (this.pagamento.idCliente){
                this.updatePagamento(this.pagamento)
            } else {
                this.cadastrarPagamento()
            }
        }

    }

    contruirPagamento(pagamento: IPagamentoCliente):IPagamentoUpdate{
        return {
            valor: pagamento.valor,
            descricao: pagamento.descricao,
            cliente: {id: pagamento.id! }
        }
    }
}
