import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageData } from 'src/app/shared/dataStorage';
import { LoginService } from 'src/app/services/login.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EncrDecrService } from 'src/app/shared/encrDecr';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userStorage: StorageData, private userServices: LoginService, private EncrDecr: EncrDecrService, private router: Router) { }

  @ViewChild('frmUpdate', { static: true }) frmUpdate: NgForm;
  @ViewChild('frmPassword', { static: true }) frmPassword: NgForm;
  @ViewChild('frmDeleteAcc', { static: true }) frmDeleteAcc: NgForm;

  userInfo: any = {};
  userModel: any = {};
  editStatus = false;
  passwordModel: any = {};
  clodePasswordMenu = false;
  toastShow = false;
  accountDelStatus = false;
  imageUploadStatus = false;

  ngOnInit() {
    this.userInfo = this.userStorage.storage;
    this.userData();
  }

  userData() {
    // Get user data
    this.userServices.userData(this.userInfo.guid).subscribe(data => {

      // Decrypting the header response from server
      const decrypt = this.EncrDecr.getNoKey(data);
      this.userModel = decrypt;


      // Storing user data in the temp storage
      this.userStorage.storage = this.userModel;
      this.userInfo = this.userModel;

    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }
  onPictureClose() {
    this.userInfo.picture = '';
    this.editStatus = false;
  }
  onFormClose() {
    this.editStatus = false;
  }
  onClicked() {
    this.editStatus = true;
    this.userModel = {
      guid: this.userInfo.guid,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      age: this.userInfo.age,
      eyeColor: this.userInfo.eyeColor,
      company: this.userInfo.company,
      phone: this.userInfo.phone,
      address: this.userInfo.address,
      picture: this.userInfo.picture
    };
  }
  onUpdate() {
    this.userServices.update(this.userModel).subscribe(data => {
      this.userModel = {};
      this.userData();
      this.editStatus = false;
      this.imageUploadStatus = false;
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  onPasswordClose() {
    this.clodePasswordMenu = false;
    this.passwordModel = {};
  }

  onResetPassword() {
    this.passwordModel.guid = this.userInfo.guid;
    this.userServices.resetPassword(this.passwordModel).subscribe(data => {
      this.passwordModel = {};
      this.clodePasswordMenu = false;
      this.toastShow = true;
      setTimeout(() => this.toastShow = false, 5000);
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  accDeletClicked() {
    this.accountDelStatus = !this.accountDelStatus;
  }
  onImageClicked() {
    this.imageUploadStatus = !this.imageUploadStatus;
  }
  onAccountDelete() {
    const model = {
      guid: this.userInfo.guid,
      password: this.passwordModel.password
    };
    console.log(model);
    this.userServices.accountDelete(model).subscribe(data => {
      window.sessionStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }
}
