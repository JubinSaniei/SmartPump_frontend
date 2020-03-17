import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TokenDecode } from './shared/tokenDecoder';
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

    router.events.subscribe(data => {

      if (data instanceof NavigationStart) {
        this.isVisibale = !(data.url === '/');
      }
    });
  }

  ngOnInit() {

  }

}
