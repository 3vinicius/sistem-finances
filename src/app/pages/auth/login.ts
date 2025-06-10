import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../service/api/authService';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthorizationService } from '../service/api/authorizationService';
import { Utils } from '../../shared/Utils';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ToastModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, MessagesModule],
    providers: [MessageService],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--secundary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">

                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem vindo !</div>
                            <span class="text-muted-color font-medium">Login: vini </span>
                            <br/>
                            <span class="text-muted-color font-medium">Senha: vini </span>
                        </div>

                        <div>
                            <label for="Login1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Login</label>
                            <input pInputText id="Login1" type="text" placeholder="Login" class="w-full md:w-[30rem] mb-8" [(ngModel)]="login" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Lembre-me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <p-button label="Sign In" styleClass="w-full" (onClick)="autenticarUsuario()" ></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p-toast />
    `
})
export class Login {
    login: string = '';

    password: string = '';

    checked: boolean = false;

    constructor(private authService: AuthService,
                private messageService: MessageService
               ) {}



    autenticarUsuario(){
        this.authService.login(this.login, this.password).subscribe({
            next: (response) => {
                if (response.token) {
                    AuthorizationService.setToken(response.token);
                    Utils.redirecionarUsuarioAutenticadoParaDashboard(this.messageService)
                } else {
                    console.error('Login failed: No token received');
                }
            },
            error: (error) => {
                if (error.status === 401) {
                    Utils.mostrarMensagemDeAtencao("Usuário ou senha inválidos", this.messageService);
                }
            }
        })

    }
}
