import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../cadastro.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) {
    
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      role: ['comprador'] 
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      this.cadastroService.cadastrarUsuario(formData).subscribe({
        next: () => {
          this.mensagemSucesso = 'Usuário cadastrado com sucesso!';
          this.exibirPopup('success', this.mensagemSucesso);
          setTimeout(() => this.router.navigate(['/login']), 2000); 
        },
        error: (err) => {
          this.mensagemErro = err.error.message || 'Erro ao cadastrar usuário.';
          this.exibirPopup('error', this.mensagemErro);
        }
      });
    } else {
      this.mensagemErro = 'Preencha todos os campos corretamente.';
      this.exibirPopup('error', this.mensagemErro);
    }
  }


  exibirPopup(tipo: string, mensagem: string) {
    const popup = document.createElement('div');
    popup.className = `popup ${tipo}`;
    popup.innerText = mensagem;
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3000);
  }

 
  get formControls() {
    return this.cadastroForm.controls;
  }
}
