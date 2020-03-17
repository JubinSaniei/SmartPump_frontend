import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenDecode } from 'src/app/shared/tokenDecoder';
import { LoginService } from 'src/app/services/login.service';
import { EncrDecrService } from 'src/app/shared/encrDecr';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';
import { Chart } from 'chart.js';
import { StorageData } from 'src/app/shared/dataStorage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  decodeModel: any;
  userModel: any;
  transactionMerge: Array<any>;
  transChart: null;
  selectedTrans: number;
  transactionTitle = '';
  transactionAmount: null;
  storage = {};

  constructor(private router: Router, private userServices: LoginService, private EncrDecr: EncrDecrService, private userStorage: StorageData) { }

  ngOnInit() {
    this.decodeToken();
    this.userData();

  }

  decodeToken() {
    // Decoding token
    this.decodeModel = TokenDecode.getDecodedAccessToken();
  }

  userData() {
    // Get user data
    this.userServices.userData(this.decodeModel.guid).subscribe(data => {

      // Decrypting the header response from server
      const decrypt = this.EncrDecr.getNoKey(data);
      this.userModel = decrypt;
      // merge deposit and withdraw
      this.transactionMerge = (this.userModel.balance.deposit.concat(this.userModel.balance.withdraw));

      // Sort transactions based on date
      this.transactionMerge.sort((a, b) => (a.date < b.date) ? 1 : -1);

      // Storing user data in the temp storage
      this.userStorage.storage = this.userModel;
      
      this.chart();
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  chart() {
    this.transChart = new Chart('transChart', {
      type: 'pie',
      data: {
        labels: ['Incomes', 'Expences'],
        datasets: [{
          label: '# of Votes',
          data: [this.userModel.balance.totalWithdraw, this.userModel.balance.totalDeposit],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true
        }
      }
    });
  }

  onDropdownSelected(e) {
    // get dropdown event
    const element = e.toElement.innerText;

    this.transactionTitle = element;
    if (element === 'Deposit') {
      this.selectedTrans = 1;
    }
    if (element === 'Withdraw') {
      this.selectedTrans = 2;
    }
    if (element === 'Add Transaction') {
      this.selectedTrans = 0;
      this.transactionAmount = null;
    }
  }
  onTransaction() {

    if (!this.selectedTrans) {
      return HttpResponseMessageHandler.InfoMsg('Please enter an amout');
    }
    // if transaction was deposit
    if (this.selectedTrans === 1) {
      const depoModel = { guid: this.decodeModel.guid, newValue: this.transactionAmount };
      this.userServices.deposit(depoModel).subscribe(data => {
        this.transactionAmount = null;
        this.selectedTrans = 0;
        this.userData();
      }, err => {
        HttpResponseMessageHandler.ErrorMsg(err);
      });
    }
    // if transaction was withdraw
    if (this.selectedTrans === 2) {
      const withdrawModel = { guid: this.decodeModel.guid, newValue: this.transactionAmount };
      this.userServices.withdraw(withdrawModel).subscribe(data => {
        this.transactionAmount = null;
        this.selectedTrans = 0;
        this.userData();
      }, err => {
        HttpResponseMessageHandler.ErrorMsg(err);
      });
    }

  }
}
