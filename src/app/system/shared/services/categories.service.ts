import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {

    private api: string = 'categories';

    constructor(public http: HttpClient) {
        super(http);
    }

    addCategory(category: Category) {
        return this.post(this.api, category);
    }

    getCategories() {
        return this.get(this.api);
    }

    updateCategory(category: Category) {
        return this.put(this.api + `/${category.id}`, category);
    }

    getCategoryById(id: number) {
        return this.get(this.api + `/${id}`);
    }
}