import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { FormValidateService } from '../form-validate.service';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;

  constructor(
    private validForm: FormValidateService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userAuthorization() {
    const user = {
      login: this.login,
      password: this.password
    };

    if (!this.validForm.checkLogin(user.login)) {
      this.flashMessages.show('Enter login', {
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

    this.authService.authorizationUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      } else {
        this.flashMessages.show("Success log in!", {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }

}
