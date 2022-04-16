import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from './_models/user';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  postId: any;
  title = 'Login-Page';
  client: User = new User;
  hide = true;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { 
  }

  login: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    token: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)])
  });

  get usernameInput() {
    return this.login.get('username');
  }

  get passwordInput() {
    return this.login.get('password');
  }

  get tokenInput() {
    return this.login.get('token');
  }

  getErrorMessage() {
    return this.usernameInput?.value.hasError('required') ? 'You must enter a value' : 
      this.usernameInput?.value.hasError('email') ? 'Not a valid email' : 
      '';
  }

  setUsername() {
    this.client.username = this.usernameInput?.value;
  }

  setPassword() {
    this.client.password = this.passwordInput?.value;
  }

  setToken() {
    this.client.token = this.tokenInput?.value;
  }

  submitCredentials() {
    const headers = {'content-type': 'application/json'}
    this.setUsername();
    this.setPassword();
    this.setToken();

    this.http.post<any>("http://localhost:8080/login", this.client, {'headers': headers}).subscribe(data => {
      this.client.authorized = data["authorized"];
      this.attemptLogin(this.client.authorized);
    })
  }

  attemptLogin(isAuthorized: boolean) {
    if (isAuthorized){
      location.href = 'http://onecause.com'
    } else{
      this.dialog.open(MessageComponent, { data: {
        message: "ERROR"
      }});
    }
  }

}
