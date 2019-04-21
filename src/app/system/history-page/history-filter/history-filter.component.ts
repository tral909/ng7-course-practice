import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'regorov-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() { }

  closeFilter() {
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if(checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
      this[field] = this[field].filter(i => i !== value);
    }
  }

  // terget has 2 fields checked(pushed checkbox or no) and value(valueof checkbox)
  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
