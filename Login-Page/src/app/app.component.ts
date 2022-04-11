import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Login-Page';
  client: User = new User;
  hide = true;

  login: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  get usernameInput() {
    return this.login.get('username');
  }

  get passwordInput() {
    return this.login.get('password');
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

  submitCredentials() {
    this.setUsername();
    this.setPassword();

    console.log('username: ' + this.client.username);
    console.log('password: ' + this.client.password);
  }
  
}
