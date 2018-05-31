import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  dni: string = '';
  lastName: string = '';
  birthdate: string = '';
  user = { name: '', lastName: '', birthdate: '', dni: ''};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'name': new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i)
      ]),
      'lastName': new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'birthdate': new FormControl(this.user.birthdate, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'dni': new FormControl(this.user.dni, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  login() : void {
    console.log(this.loginForm)
  }



  get name() { return this.loginForm.get('name'); }

  get power() { return this.loginForm.get('power'); }
}
