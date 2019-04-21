import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { RegorovEvent } from '../../shared/models/event.model';

@Component({
  selector: 'regorov-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: RegorovEvent[] = [];

  constructor() { }

  ngOnInit() {
      this.events.forEach(e => {
          e.catName = this.categories.find(c => c.id === e.category).name;
      });
  }

  getEventClass(e: RegorovEvent) {
      return {
          'label': true,
          'label-danger': e.type === 'outcome',
          'label-success': e.type === 'income'
      }
  }
}
