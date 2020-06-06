import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'
import { isPlatformBrowser } from '@angular/common'

export interface Route {
	name: string
	url: string,
}

export interface IconButton extends Route {
	icon: string
}

@Component({
	selector: 'ale-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	themeMode: ThemeMode
	openedMenu: boolean = false
	routerSubscription: Subscription
	homeRoute: string = ''

	menu: Route[] = [
		{ name: 'header-nav.home', url: '/' },
		{ name: 'header-nav.blog', url: '/blog' },
		{ name: 'header-nav.about', url: '/about' },
		{ name: 'header-nav.contact', url: '/contact' }
	]

	social: IconButton[] = [
		{ name: 'social.github', url: 'https://github.com/aledroner', icon: 'github' },
		{ name: 'social.twitter', url: 'https://twitter.com/alej_dev', icon: 'twitter' }
	]

	constructor(
		private themeService: ThemeHandlerService,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId: object
	) { }

	ngOnInit(): void {

		// Set theme mode
		this.setThemeMode()

		// Router Subscription
		this.routerSubscription = this.router.events.subscribe((route) => {
			if (route instanceof NavigationEnd) {

				// Reset menu if route changes
				this.openedMenu = false

				// Toggle 'home-route' class
				if (isPlatformBrowser(this.platformId)) {
					const classListHeader = document.getElementById('main-header').classList
					if (route.url === '/') {
						classListHeader.add('home-route')
						this.homeRoute = '-home-route'
					} else {
						classListHeader.remove('home-route')
						this.homeRoute = ''
					}
				}
			}
		})
	}

	setThemeMode() {
		this.themeMode = this.themeService.getTheme()
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
		this.setThemeMode()
	}

	ngOnDestroy(): void {
		if (this.routerSubscription) {
			this.routerSubscription.unsubscribe()
		}
	}
}
