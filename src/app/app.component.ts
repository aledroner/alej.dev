import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { SwUpdate } from '@angular/service-worker'
import { TranslateService } from '@ngx-translate/core'

const languages = ['es']

@Component({
	selector: 'ale-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private SwUpdateSubscription: Subscription
	private readonly defaultLanguage: string = 'es'

	constructor(
		private swUpdate: SwUpdate,
		private translateService: TranslateService
	) { }

	ngOnInit(): void {
		// Service Worker
		if (this.swUpdate.isEnabled) {
			this.SwUpdateSubscription = this.swUpdate.available.subscribe(() => {
				setTimeout(() => window.location.reload(), 3000)
			})
		}

		// Set translations
		this.translateService.addLangs(languages)
		this.translateService.use(this.defaultLanguage)
	}

	ngOnDestroy(): void {
		if (this.SwUpdateSubscription) {
			this.SwUpdateSubscription.unsubscribe()
		}
	}
}
