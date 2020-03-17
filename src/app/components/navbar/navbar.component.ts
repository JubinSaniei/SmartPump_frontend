import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenDecode } from '../../shared/tokenDecoder';
import { StorageData } from '../../shared/dataStorage';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';
import { EncrDecrService } from 'src/app/shared/encrDecr';
import { LoginService } from 'src/app/services/login.service';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: []
})

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public userStorage: StorageData, private userServices: LoginService, private EncrDecr: EncrDecrService) { }

  decodeModel: any = {};
  userInfo: any = {};
  userModel: any = {};
  firstName = '';
  pictureUrl = '';

  ngOnInit() {
    this.decodeToken();
    if (!this.decodeModel) {
      this.router.navigate(['/']);
    }
  }
  decodeToken() {
    // Decoding token
    this.decodeModel = TokenDecode.getDecodedAccessToken();
    this.userData();
  }

  logout() {
    window.sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  userData() {
    // Get user data
    this.userServices.userData(this.decodeModel.guid).subscribe(data => {

      // Decrypting the header response from server
      const decrypt = this.EncrDecr.getNoKey(data);
      this.userInfo = decrypt;

      // Storing user data in the temp storage
      this.userStorage.storage = this.userInfo;

    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

}
