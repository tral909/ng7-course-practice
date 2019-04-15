import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
//import { Subscription } from 'rxjs/Subscription';

import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'regorov-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor(private billService: BillService) {}

    ngOnInit() {
        combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data: [Bill, any]) => {
            console.log(data);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
