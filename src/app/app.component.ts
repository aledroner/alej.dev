
import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'ale-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private swUpdateSubscription: Subscription

  constructor(
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    // Service Worker update
    this.swUpdateSubscription = this.swUpdate.available.subscribe(() => {
      this.swUpdate.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnDestroy(): void {
    if (this.swUpdateSubscription) {
      this.swUpdateSubscription.unsubscribe()
    }
  }
}
