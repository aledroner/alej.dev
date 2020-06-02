import { NgModule, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { ThemeHandlerService } from './services/theme-handler.service'
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { IconThemePipe } from './pipes/icon-theme.pipe'
import { HttpClientModule } from '@angular/common/http'
import { I18nModule } from '../i18n/i18n.module'

const components = [
	HeaderComponent,
	IconThemePipe
]

const modules = [
	CommonModule,
	RouterModule,
	HttpClientModule,
	FontAwesomeModule,
	I18nModule
]

export function themeFactory(themeService: ThemeHandlerService) {
	return () => themeService.setThemeOnStart()
}

@NgModule({
	declarations: [
		...components
	],
	imports: [
		...modules
	],
	exports: [
		...components,
		...modules
	],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeHandlerService], multi: true }
	]
})
export class SharedModule {
	constructor(
		faConfig: FaConfig,
		library: FaIconLibrary
	) {
		faConfig.defaultPrefix = 'fas'
		library.addIcons(faGithub, faMoon, faSun, faTwitter)
	}
}
