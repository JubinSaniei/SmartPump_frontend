import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('errorMessage', { static: true }) errorMessage: ElementRef;
  @ViewChild('frmRegister', { static: true }) frmRegister: NgForm;

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient) { }


  loginFrm: any = {};
  registerModel: any = {};
  decodeModel: any = {};
  activeToken: any = {};
  errorMsg: String;
  register = false;
  toastShow = false;

  ngOnInit() {
  }
  onLogin() {

    const loginModel = {
      userName: this.loginFrm.userName,
      password: this.loginFrm.password,
    };

    if (!this.loginFrm.userName || !this.loginFrm.password) {
      this.errorMsg = 'Username and Password is required';
      this.errorMessage.nativeElement.click();
      return;
    }

    this.loginService.login(loginModel).subscribe(data => {

      window.sessionStorage.setItem('token', data);

      this.router.navigate(['dashboard']);

    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
      this.errorMsg = err.error;
      this.errorMessage.nativeElement.click();
    });
  }

  onRegister() {
    this.loginService.register(this.registerModel).subscribe(data => {
      this.register = false;
      this.toastShow = true;
      setTimeout(() => this.toastShow = false, 5000);

    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }
}
