import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { ClienteComponent } from './cliente/cliente.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { ComprasComponent } from './compras/compras.component';
import { GraphsComponent } from './graphs/graphs.component';
import { Landing } from './landing/landing';

export default [
    { path: 'empty', component: Empty },
    { path: 'cliente', component: ClienteComponent},
    { path: 'pagamentos', component: PagamentosComponent},
    { path: 'compras', component: ComprasComponent},
    { path: 'graficos', component: GraphsComponent},
    { path: 'loading', component: Landing},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
