import { Observable, Subscription } from 'rxjs'

import { isPlatformBrowser } from '@angular/common'
import { Component, DoCheck, Inject, KeyValueDiffer, KeyValueDiffers, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { DataService } from '../../services/data.service'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'

@Component({
	selector: 'ale-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {

	mainMenu$: Observable<object>
	socialMenu$: Observable<object>

	themeMode: ThemeMode
	openedMenu: boolean = false

	resetScroll$: Observable<boolean>
	routerSubscription: Subscription
	homeRoute: boolean
	homeRouteClass: string = 'home-route'

	differ: KeyValueDiffer<string, any>

	constructor(
		private data: DataService,
		private themeService: ThemeHandlerService,
		private router: Router,
		private differs: KeyValueDiffers,
		@Inject(PLATFORM_ID) private platformId: object
	) {
		this.differ = this.differs.find({}).create()
	}

	ngOnInit(): void {
		this.mainMenu$ = this.data.mainMenu
		this.socialMenu$ = this.data.socialMenu

		this.setThemeMode()
		this.setHomeRouteConfig()
	}

	ngDoCheck(): void {
		const change = this.differ.diff(this)
		if (change && isPlatformBrowser(this.platformId)) {
			change.forEachChangedItem(item => {
				if (item.key === 'openedMenu') {
					document.body.classList.toggle('menu-opened-gap')
					document.body.classList.toggle('menu-opened-overflow')
					document.getElementById('main-header').classList.toggle('menu-opened-gap')
				}
			})
		}
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

				// set document height
				setDocHeight()
				addEventListener('resize', setDocHeight)
				addEventListener('orientationchange', setDocHeight)
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

const setDocHeight = () => {
	document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
}
