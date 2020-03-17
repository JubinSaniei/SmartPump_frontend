import { NgModule, OnInit, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, HttpClientModule, BrowserModule]
})

export class AppRoutingModule implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {

  }
  logout() {
    console.log('adasdasda');
    window.sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
