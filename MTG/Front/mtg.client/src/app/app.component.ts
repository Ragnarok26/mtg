import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from './services/client/client.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'mtg-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public formGroup!: FormGroup;
  public isLoggedIn: boolean = false;

  constructor(private clientService: ClientService,
              private primengConfig: PrimeNGConfig) {
    const token = localStorage.getItem('token');
    this.isLoggedIn = token !== null && token !== 'null';
    if (this.isLoggedIn) {
      const tokenDetails = JSON.parse(token!);
      const expireAt = new Date(tokenDetails.expireAt);
      const currentDate = new Date();
      if (currentDate >= expireAt) {
        localStorage.setItem('token', null!);
        this.isLoggedIn = false;
      }
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    if (this.isLoggedIn) {
      this.formGroup = new FormGroup({
        username: new FormControl<string | null>(null),
        password: new FormControl<string | null>(null)
      });
    }
  }

  public async login() {
    const user = {
      username: this.formGroup!.get('username')?.value,
      password: this.formGroup!.get('password')?.value
    }
    try {
      const response = await this.clientService.login(user);
      localStorage.setItem('token', JSON.stringify(response));
      this.isLoggedIn = true;
    } catch (ex) {
      localStorage.setItem('token', null!);
      this.isLoggedIn = false;
    }
  }
}
