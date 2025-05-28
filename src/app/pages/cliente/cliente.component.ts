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
import { ClienteService } from '../service/api/clienteService';
import { ICliente } from '../../interfaces/ICliente';
import { Utils } from '../../shared/Utils';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Toast } from 'primeng/toast';
import { IColumn } from '../../interfaces/IColumn';





@Component({
    selector: 'app-cliente',
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
        NgxMaskDirective,
        Toast
    ],
    providers: [MessageService, ConfirmationService, ClienteService, provideNgxMask()],
    templateUrl: './cliente.component.html',
    styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
    clienteDialog: boolean = false;
    @ViewChild('dt') dt!: Table;

    cols: IColumn[] = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' },
        { field: 'endereco', header: 'Endereço' },
        { field: 'phone', header: 'Telefone' },
        { field: 'cpf', header: 'CPF' },
        { field: 'dataNascimento', header: 'Data Nascimento' },
        { field: 'dataCriacao', header: 'Data Criação' }
    ];
    listaClientes = signal<ICliente[]>([]);
    util = new Utils();


    cliente: ICliente = {} as ICliente;


    submitted: boolean = false;
    statuses!: any[];

    constructor(
        private clienteService: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportFilename = "Relatorio de Clientes"
        this.dt.exportCSV({ selectionOnly: false });
    }

    ngOnInit() {
        this.buscarClientes();
    }

    buscarClientes() {
        this.clienteService.get().subscribe({
            next: (value) => {
                this.listaClientes.set(value);
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
        this.cliente = {};
        this.submitted = false;
        this.clienteDialog = true;
    }

    editCliente(cliente: ICliente) {
        this.cliente = { ...cliente };
        this.clienteDialog = true;
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
        this.cliente = {};
    }

    deleteCliente(cliente: ICliente) {
        this.confirmationService.confirm({
            message: 'Você quer excluir ' + cliente.nome + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clienteService.delete(Number(cliente.idCliente)).subscribe({
                    next: value => {
                        this.buscarClientes();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Cliente excluido',
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

    updateCliente(cliente: ICliente){
        let id:number = cliente.idCliente!
        this.clienteService.put(id,cliente).subscribe({
            next: value => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuario Atualizado',
                    life: 3000
                });
                this.buscarClientes();
                this.hideDialog();
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

    cadastrarCliente(){
        this.clienteService.post(this.cliente).subscribe({
            next: (value) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuario Cadastrado',
                    life: 3000
                });
                this.buscarClientes();
                this.hideDialog();
            },
            error: (value) => {
                console.error(value);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: value.error.message
                });
            }
        });
    }

    saveCliente() {
        this.submitted = true;
        if (this.cliente.nome?.trim() && this.cliente.endereco?.trim() && this.cliente.phone?.trim()) {
            console.log(this.cliente)
            if (this.cliente.idCliente){
                this.updateCliente(this.cliente)
            } else {
                this.cadastrarCliente()
            }
        }

    }
}
