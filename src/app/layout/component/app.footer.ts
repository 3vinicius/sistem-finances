import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <img [src]="'https://3viniciusportfolio.netlify.app/assets/logo-c091dd9c.svg'" width="40px" alt="Logo">
        <a href="https://3viniciusportfolio.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Vinicius Amorim</a>
    </div>`
})
export class AppFooter {}
