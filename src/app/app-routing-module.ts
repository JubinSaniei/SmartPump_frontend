import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGaurd } from './auth-guard.service';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', canActivate: [AuthGaurd], component: DashboardComponent },
    { path: 'userProfile', canActivate: [AuthGaurd], component: UserProfileComponent },
    { path: '**', canActivate: [AuthGaurd], redirectTo: '/' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {



}
