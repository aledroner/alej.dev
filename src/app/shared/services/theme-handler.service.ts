import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

export enum ThemeMode {
	DARK = 'dark-mode',
	LIGHT = 'light-mode'
}

@Injectable({
	providedIn: 'root'
})
export class ThemeHandlerService {

	public theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.LIGHT)
	private readonly THEME_KEY = 'theme'

	constructor(
		private localStorage: LocalStorageService
	) { }

	public setThemeOnStart(): void {
		this.theme$.value === this.localStorage.getItem(this.THEME_KEY) ?
			this.setTheme(ThemeMode.LIGHT) :
			this.setTheme(ThemeMode.DARK)
	}

	public toggleTheme(): void {
		this.theme$.value === ThemeMode.DARK ?
			this.setTheme(ThemeMode.LIGHT) :
			this.setTheme(ThemeMode.DARK)
	}

	public getTheme(): ThemeMode {
		return this.theme$.value
	}

	private setTheme(mode: ThemeMode): void {
		this.theme$.next(mode)
		document.body.classList.value = mode
		this.localStorage.setItem(this.THEME_KEY, mode)
	}
}
