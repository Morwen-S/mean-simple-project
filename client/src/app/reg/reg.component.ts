import { Component, OnInit } from '@angular/core';
import { FormValidateService } from '../form-validate.service';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  constructor(
    private validForm: FormValidateService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegister() {
    const user = {
      name: this.name,
      email: this.email,
      login: this.login,
      password: this.password
    };
    if (!this.validForm.checkName(user.name)) {
      this.flashMessages.show('Enter name', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.validForm.checkLogin(user.login)) {
      this.flashMessages.show('Enter login', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.validForm.checkEmail(user.email)) {
      this.flashMessages.show('Enter email', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.validForm.checkPassword(user.password)) {
      this.flashMessages.show('Enter password', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }


    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/reg'])
      } else {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/dashboard'])
      }
    });
  };

}
