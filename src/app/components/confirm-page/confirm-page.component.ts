import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComprasService, CompraRequest } from '../compras.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent {
  produto: { quantidade: number; valor: number } | null = null;
  mensagem = { titulo: '', descricao: '' };
  mostrarMensagem = false;

  constructor(private router: Router, private comprasService: ComprasService) {
    const navigation = this.router.getCurrentNavigation();
    this.produto = navigation?.extras?.state?.['produto'] || null;
  }

  confirmarCompra() {
    if (this.produto) {
      const compraRequest: CompraRequest = {
        idUsuario: 1,
        quantidade: this.produto.quantidade
      };

      this.comprasService.comprar(compraRequest).subscribe({
        next: (response) => {
          this.mensagem.titulo = 'Compra Concluída!';
          this.mensagem.descricao = response.mensagem;
          this.mostrarMensagem = true;
          window.open(response.whatsAppLink, '_blank'); 
        },
        error: (err) => {
          console.error('Erro ao realizar a compra:', err); 
          this.mensagem.titulo = 'Erro';
          this.mensagem.descricao = 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.';
          this.mostrarMensagem = true;
        }
      });
    }
  }

  cancelarCompra() {
    this.router.navigate(['/buy-page']);
  }

  fecharMensagem() {
    this.mostrarMensagem = false;
    this.router.navigate(['/buy-page']);
  }
}
