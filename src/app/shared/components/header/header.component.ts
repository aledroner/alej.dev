import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
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
	resetScroll$: Observable<boolean>
	routerSubscription: Subscription
	homeRoute: boolean
	homeRouteClass: string = 'home-route'

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
