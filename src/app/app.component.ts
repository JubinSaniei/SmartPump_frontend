import { Component, OnInit, Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { StorageData } from './shared/dataStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Smart Pump';
  isVisibale: Boolean = false;

  constructor(private router: Router, private dataStorage: StorageData) {

  }

  ngOnInit() {

  }

}
