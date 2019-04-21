import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { RegorovEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'regorov-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  event: RegorovEvent;
  category: Category;
  isLoaded = false;
  s1: Subscription;

  constructor(
      private route: ActivatedRoute,
      private eventsService: EventsService,
      private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
      this.s1 = this.route.params
          .subscribe((params: Params) => {
              this.eventsService.getEventById(params['id'])
                  .subscribe((e: RegorovEvent) => {
                      this.event = e;
                      this.categoriesService.getCategoryById(e.category)
                          .subscribe((c: Category) => {
                              this.category = c;
                              this.isLoaded = true;
                              return this.category;
                          });
                  });
          });
  }

  ngOnDestroy() {
      if (this.s1) {
          this.s1.unsubscribe();
      }
  }

}
