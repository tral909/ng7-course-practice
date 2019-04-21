import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category.model';
import { EventsService } from '../shared/services/events.service';
import { RegorovEvent } from '../shared/models/event.model';

@Component({
  selector: 'regorov-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: RegorovEvent[] = [];
  isLoaded = false;
  chartData = [];
  s1: Subscription;
  isFilterVisible = false;

  constructor(
      private categoriesService: CategoriesService,
      private eventsService: EventsService
  ) {}

  ngOnInit() {
      this.s1 = combineLatest(
          this.categoriesService.getCategories(),
          this.eventsService.getEvents()
      ).subscribe((data: [Category[], RegorovEvent[]]) => {
          this.categories = data[0];
          this.events = data[1];
          this.calculateChartData();
          this.isLoaded = true;
      });
  }

  ngOnDestroy() {
      if (this.s1) {
          this.s1.unsubscribe();
      }
  }

  calculateChartData(): void {
      this.chartData = [];
      this.categories.forEach((cat) => {
          const catEvents = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
          this.chartData.push({
              name: cat.name,
              value: catEvents.reduce((total, e) => {
                  total += e.amount;
                  return total;
              }, 0)
          });
      });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
  }

  onFilterApply(filterData) {
    console.log(filterData);
  }

}
