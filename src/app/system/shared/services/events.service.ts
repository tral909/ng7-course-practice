import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { BaseApi } from '../../../shared/core/base-api';
import { RegorovEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: RegorovEvent) {
        return this.post('events', event);
    }

    getEvents() {
        return this.get('events');
    }
}