import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { RegorovEvent } from '../shared/models/event.model';

@Component({
  selector: 'regorov-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;

  bill: Bill;
  categories: Category[] = [];
  events: RegorovEvent[] = [];

  constructor(
      private billService: BillService,
      private categoryService: CategoriesService,
      private eventService: EventsService
  ) {}

  ngOnInit() {
      this.s1 = combineLatest(
          this.billService.getBill(),
          this.categoryService.getCategories(),
          this.eventService.getEvents()
      ).subscribe((data: [Bill, Category[], RegorovEvent[]]) => {
          this.bill = data[0];
          this.categories = data[1];
          this.events = data[2];
          this.isLoaded = true;
      });
  }

  ngOnDestroy() {
      if (this.s1) {
          this.s1.unsubscribe();
      }
  }

  private getPercent(cat: Category): number {
      const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
      return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
      return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
      const percent = this.getPercent(cat);
      return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  getCategoryCost(cat: Category): number {
      const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
      return catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
      }, 0);
  }

}
