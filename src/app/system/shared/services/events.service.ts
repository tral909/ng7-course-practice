import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { BaseApi } from '../../../shared/core/base-api';
import { RegorovEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

    private api: string = 'events';

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: RegorovEvent) {
        return this.post(this.api, event);
    }

    getEvents() {
        return this.get(this.api);
    }

    getEventById(id: string) {
        return this.get(this.api + `/${id}`);
    }
}