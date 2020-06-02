import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
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
			this.SwUpdateSubscription = this.swUpdate.available.subscribe(() => {
				setTimeout(() => window.location.reload(), 3000)
			})
		}
	}

	ngOnDestroy(): void {
		if (this.SwUpdateSubscription) {
			this.SwUpdateSubscription.unsubscribe()
		}
	}
}
