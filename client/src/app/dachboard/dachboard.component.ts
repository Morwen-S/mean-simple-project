import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dachboard',
  templateUrl: './dachboard.component.html',
  styleUrls: ['./dachboard.component.css']
})
export class DachboardComponent implements OnInit {

  name: String;
  login: String;
  email: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.name = user.name;
    this.login = user.login;
    this.email = user.email;
  }

  logout () {
    this.authService.logoutUser();
    this.flashMessages.show("Log Out!", {
      cssClass: 'alert-warning',
      timeout: 2000
    });
    this.router.navigate(['/auth']);
    return false;
  }

}
