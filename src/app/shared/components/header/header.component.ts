import { Component, OnInit, OnDestroy } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'

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
		private router: Router
	) { }

	ngOnInit(): void {
		this.setThemeMode()
		this.routerSubscription = this.router.events.subscribe((route) => {
			if (route instanceof NavigationEnd) {
				this.openedMenu = false
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
