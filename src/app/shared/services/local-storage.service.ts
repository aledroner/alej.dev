import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor(
		@Inject(PLATFORM_ID) private platformId: object
	) { }

	clear(): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.clear()
		}
	}

	setItem(key: string, value: string): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem(key, value)
		}
	}

	getItem(key: string): string {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.getItem(key)
		}
	}

	removeItem(key: string): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.removeItem(key)
		}
	}

	key(index: number): string {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.key(index)
		}
	}

	length(): number {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.length
		}
	}
}
