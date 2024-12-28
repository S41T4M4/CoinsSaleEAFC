import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent {
  produtos = [
    { quantidade: 100000, valor: 22 },
    { quantidade: 200000, valor: 44 },
    { quantidade: 300000, valor: 66 },
    { quantidade: 1000000, valor: 180 }
  ];

  mostrarMensagem = false;
  mensagem = { titulo: '', descricao: '' };

  constructor(private router: Router) {}

  redirecionarParaConfirmacao(produto: { quantidade: number; valor: number }) {
    this.router.navigate(['/confirmacao'], { state: { produto } });
  }

  fecharMensagem() {
    this.mostrarMensagem = false;
  }
}
