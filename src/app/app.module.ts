import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { TokenDecode } from './shared/tokenDecoder';
import { HttpResponseMessageHandler } from './shared/httpResponse.msg.handeler';
import { ConfirmButtonDirective } from './shared/confirmBtn.Directive';
import { EncrDecrService } from './shared/encrDecr';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StorageData } from './shared/dataStorage';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthGaurd } from './auth-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UserProfileComponent,
    NavbarComponent,
    ConfirmButtonDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [
    LoginService,
    TokenDecode,
    HttpResponseMessageHandler,
    ConfirmButtonDirective,
    EncrDecrService,
    StorageData,
    AuthGaurd

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
