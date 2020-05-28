import { Component, OnInit } from '@angular/core'
import { ThemeHandlerService, ThemeMode } from '../../services/theme-handler.service'

export interface Route {
	name: string
	url: string
}

@Component({
	selector: 'ale-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	themeMode: ThemeMode

	menu: Route[] = [
		{ name: 'home', url: '/' },
		{ name: 'about', url: '/about' },
		{ name: 'contact', url: '/contact' }
	]

	constructor(
		private themeService: ThemeHandlerService
	) { }

	ngOnInit(): void {
		this.themeMode = this.themeService.getTheme()
	}

	toggleTheme(): void {
		this.themeService.toggleTheme()
		this.themeMode = this.themeService.getTheme()
	}

}
