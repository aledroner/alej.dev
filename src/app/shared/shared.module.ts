import { NgModule, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { ThemeHandlerService } from './services/theme-handler.service'
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { IconThemePipe } from './pipes/icon-theme.pipe'

const components = [
	HeaderComponent,
	IconThemePipe
]

const modules = [
	CommonModule,
	RouterModule,
	FontAwesomeModule
]

export function themeFactory(themeService: ThemeHandlerService) {
	return () => themeService.setThemeOnStart()
}

@NgModule({
	declarations: [...components],
	imports: [...modules],
	exports: [...components, ...modules],
	providers: [
		ThemeHandlerService, { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeHandlerService], multi: true }
	]
})
export class SharedModule {
	constructor(
		faConfig: FaConfig,
		library: FaIconLibrary
	) {
		faConfig.defaultPrefix = 'fas'
		library.addIcons(faMoon, faSun)
	}
}
