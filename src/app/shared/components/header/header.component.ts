import { Component, OnInit } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'

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
export class HeaderComponent implements OnInit {

	themeMode: ThemeMode

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
		private themeService: ThemeHandlerService
	) { }

	ngOnInit(): void {
		this.setThemeMode()
	}

	setThemeMode() {
		this.themeMode = this.themeService.getTheme()
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
		this.setThemeMode()
	}

}
