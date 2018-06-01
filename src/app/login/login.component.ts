import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenAgeValidator } from '../forbidden-age.directive';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = { name: '', lastName: '', birthdate: '', dni: '' };
  fail = { show: false, name: '' };
  maxDate: Date = new Date();
  loginForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'name': new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'lastName': new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'birthdate': new FormControl(this.user.birthdate, [
        Validators.required,
        forbiddenAgeValidator(18),
      ]),
      'dni': new FormControl(this.user.dni, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
    });
  }

  login(): void {
    const { name, lastName, birthdate, dni } = this.loginForm.value;
    const user = new User(dni, name, lastName, birthdate);
    console.log(user)
    this.fail = { show: false, name: '' };
    this.userService.addUser(user)
      .subscribe(
        data => {
          console.log(data);
          return true;
        },
        error => {
          const { status } = error;
          if (status === 200) {
            this.fail = { show: false, name };
          } else {
            this.fail = { show: true, name: '' };
          }
        }
      );
  }

  get name() { return this.loginForm.get('name'); }
  get dni() { return this.loginForm.get('dni'); }
  get lastName() { return this.loginForm.get('lastName'); }
  get birthdate() { return this.loginForm.get('birthdate'); }

}
