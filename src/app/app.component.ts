
import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'ale-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private SwUpdateSubscription: Subscription

  constructor(
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    // Service Worker
    if (this.swUpdate.isEnabled) {
      this.SwUpdateSubscription = this.swUpdate.available
        .subscribe(() => window.location.reload())
    }
  }

  ngOnDestroy(): void {
    if (this.SwUpdateSubscription) {
      this.SwUpdateSubscription.unsubscribe()
    }
  }
}
