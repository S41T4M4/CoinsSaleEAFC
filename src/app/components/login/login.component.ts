import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  mensagemErro: string = '';  
  isLoginVisible = true;
  isRegisterVisible = false;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe(
        response => {
          console.log('Login bem sucedido', response);
          if (response.role === 'comprador') {
            this.router.navigate(['/home']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/home']);
          } else {
            console.log('Perfil inválido');
            this.mensagemErro = 'Perfil inválido. Por favor, entre em contato com o administrador.';
          }
        },
        error => {
          if (error.status === 401) {
            this.mensagemErro = 'Senha incorreta. Tente novamente.';
          } else if (error.status === 404) {
            this.mensagemErro = 'E-mail não cadastrado. Verifique os dados.';
          } else {
            this.mensagemErro = 'Erro ao tentar realizar o login. Tente novamente.';
          }
        }
      );
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
    }
  }

  closePopup() {
    this.mensagemErro = '';  
  }

  showLogin() {
    this.isLoginVisible = true;
    this.isRegisterVisible = false;
    console.log('Login Visível');
  }

  showRegister() {
    this.isLoginVisible = false;
    this.isRegisterVisible = true;
    console.log('Registro Visível');
  }
}
