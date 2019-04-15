import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    getBill() {
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB') {
        return this.get('currency');
    }
}