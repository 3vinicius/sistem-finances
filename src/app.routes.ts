import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes')},
    { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {
        path: 'pages',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: '', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
