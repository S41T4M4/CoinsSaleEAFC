import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { BuyPageComponent } from './components/buy-page/buy-page.component';
import { ConfirmPageComponent } from './components/confirm-page/confirm-page.component';
import { AuthGuard } from './_guard/autorizado.guard';
import { WrongPageComponent } from './components/wrong-page/wrong-page.component';

const routes: Routes = [
 

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

 
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'buy-page',
    component: BuyPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirmacao',
    component: ConfirmPageComponent,
    canActivate: [AuthGuard],
  },


  { path: '404', component: WrongPageComponent },
  { path: '**', redirectTo: '404' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
