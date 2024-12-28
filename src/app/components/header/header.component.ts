import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  buttonsAppear = false;

 
  constructor(private router: Router, private loginService: LoginService) {}
 
  ngOnInit(): void {
 
    this.checkRoute();
    this.router.events.subscribe(() => {
      this.checkRoute();
    });

  }

  private checkRoute(): void {
    const currentRoute = this.router.url;
    if (
      currentRoute === '/login' ||
      currentRoute === '/cadastro' ||
      currentRoute === '/' ||
      currentRoute === '/login?returnUrl=%2Fhome'
    ) {
      this.buttonsAppear = true;
    } else {
      this.buttonsAppear = false;
    }
  }

  logout(): void {
    const isLogged = localStorage.getItem('token');
    if (isLogged) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
  myMenuFunction() {
    console.log('Menu toggled');
  }
}
