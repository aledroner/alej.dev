import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { isPlatformBrowser } from '@angular/common'
import { DataService } from '../../services/data.service'

@Component({
	selector: 'ale-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	mainMenu$: Observable<object>
	socialMenu$: Observable<object>

	themeMode: ThemeMode
	openedMenu: boolean = false

	resetScroll$: Observable<boolean>
	routerSubscription: Subscription
	homeRoute: boolean
	homeRouteClass: string = 'home-route'

	constructor(
		private data: DataService,
		private themeService: ThemeHandlerService,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId: object
	) { }

	ngOnInit(): void {
		this.mainMenu$ = this.data.mainMenu
		this.socialMenu$ = this.data.socialMenu

		this.setThemeMode()
		this.setHomeRouteConfig()
	}

	setThemeMode() {
		this.themeMode = this.themeService.getTheme()
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
		this.setThemeMode()
	}

	setHomeRouteConfig(): void {
		this.routerSubscription = this.router.events.subscribe((route) => {
			if (route instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
				this.openedMenu = false
				this.toggleHomeRouteClass()
				window.scrollTo(0, 0)
			}
		})
	}

	toggleHomeRouteClass(scrolled?: boolean) {
		if (isPlatformBrowser(this.platformId)) {
			const classListHeader = document.getElementById('main-header').classList
			if (window.location.pathname === '/' && !scrolled) {
				this.homeRoute = true
				classListHeader.add(this.homeRouteClass)
			} else {
				this.homeRoute = false
				classListHeader.remove(this.homeRouteClass)
			}
		}
	}

	ngOnDestroy(): void {
		if (this.routerSubscription) {
			this.routerSubscription.unsubscribe()
		}
	}
}
