import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseApi {
    private baseUrl: string = 'http://localhost:3000/';

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    public get(url: string = '') {
        return this.http.get(this.getUrl(url));
    }

    public post(url: string = '', data: any = {}) {
        return this.http.post(this.getUrl(url), data);
    }

    public put(url: string = '', data: any = {}) {
        return this.http.put(this.getUrl(url), data);
    }
}