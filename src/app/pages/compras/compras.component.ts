import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
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
import { Utils } from '../../shared/Utils';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Toast } from 'primeng/toast';
import { IClienteNomeId } from '../../interfaces/IClienteNomeId';
import { ComprasService } from '../service/api/comprasService';
import { ICompraCliente } from '../../interfaces/ICompraCliente';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePicker } from 'primeng/datepicker';
import { ICompras } from '../../interfaces/ICompras';
import { IColumn } from '../../interfaces/IColumn';




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
        DatePickerModule,
        Toast
    ],
    providers: [MessageService, ConfirmationService, ClienteService, provideNgxMask()],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent implements OnInit, AfterViewInit{
    compraDialog: boolean = false;
    clienteDialog: boolean = false;
    @ViewChild('dt') dt!: Table;
    @ViewChild('prevPagamento') datePicker!: DatePicker;

    cols: IColumn[] = [
        { field: 'idCompra', header: 'ID' },
        { field: 'nome', header: 'Cliente' },
        { field: 'valor', header: 'Valor' },
        { field: 'dataPrevPagamento', header: 'Previsão Pagamento' },
        { field: 'descricao', header: 'Descrição' },
        { field: 'produto', header: 'Produto' },
        { field: 'quitado', header: 'Quitado' },
        { field: 'total', header: 'Total' }
    ];
    listaCompras = signal<ICompraCliente[]>([]);
    util = new Utils();

    minDate = new Date();
    maxDate =  new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 2, this.minDate.getDate());

    compra: ICompraCliente = {};
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
        this.dt.exportFilename = "Relatorio de Compras"
        this.dt.exportCSV({
            selectionOnly: false,
        });
    }

    ngOnInit() {
        this.buscarCompras();
        this.buscarListaClienteNomeId()
    }

    ngAfterViewInit() {
        if (this.datePicker) {
            this.datePicker.appendTo = 'body';
        }
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
        this.comprasService.get().subscribe({
            next: (value) => {
                this.listaCompras.set(value);
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

    deleteCompra(compra: ICompras) {
        this.confirmationService.confirm({
            message: 'Você quer excluir a compra de ' + compra.produto + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.comprasService.delete(compra.idCompra!).subscribe({
                    next: value => {
                        this.buscarCompras();
                        Utils.mostrarMensagemDeSucesso('Compra excluida', this.messageService);
                    },
                    error: err => {
                        console.error(err)
                        Utils.mostrarMensagemDeErro(err.error.message, this.messageService);
                    }
                })
            }
        });
    }

    updateCompra(compra:  ICompraCliente){
        let id:number = compra.idCompra!
        compra.dataPrevPagamento = this.util.formatarDataParaStringComBarras(compra.dataPrevPagamento)
        this.comprasService.put(id,this.contruirCompra(compra)).subscribe({
            next: value => {
                Utils.mostrarMensagemDeSucesso('Compra Atualizada', this.messageService);
                this.buscarCompras();
                this.hideDialogCompra();
            },
            error: err => {
                console.error(err)
                Utils.mostrarMensagemDeErro(err.error.message, this.messageService);
            }
        })
    }

    cadastrarCompra(){
        this.comprasService.post(this.contruirCompra(this.compra)).subscribe({
            next: value => {
                Utils.mostrarMensagemDeSucesso("Compra cadastrada com sucesso", this.messageService);
                this.buscarCompras();
                this.hideDialogCompra();
            },
            error: value => {
                console.error(value)
                Utils.mostrarMensagemDeErro(value.error.message, this.messageService);
            }
        });
    }

    saveCompra() {
        this.submitted = true;

        if (this.compra.idCliente && this.compra.descricao?.trim()
            && this.compra.produto?.trim()
            && this.compra.valor && this.compra.dataPrevPagamento) {
            if (this.compra.idCompra){
                this.updateCompra(this.compra)
            } else {
                this.cadastrarCompra()
            }
        }

    }

    contruirCompra(compraCliente:  ICompraCliente): {
        idCompra : number | undefined;
        valor: number | undefined;
        descricao: string | undefined;
        dataPrevPagamento: string | undefined;
        produto: string | undefined;
        idCliente: number
    } {
        return {
            idCompra : compraCliente.idCompra,
            valor: compraCliente.valor,
            dataPrevPagamento: this.util.formatarDataParaStringComBarras(compraCliente.dataPrevPagamento),
            produto: compraCliente. produto,
            descricao: compraCliente.descricao,
            idCliente: compraCliente.idCliente!
        }
    }
}
