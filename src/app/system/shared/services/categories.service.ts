import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    addCategory(category: Category) {
        return this.post('categories', category);
    }
}