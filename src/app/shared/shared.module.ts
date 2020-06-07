import { NgModule, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { ThemeHandlerService } from './services/theme-handler.service'
import { IconThemePipe } from './pipes/icon-theme.pipe'
import { HttpClientModule } from '@angular/common/http'
import { I18nModule } from '../i18n/i18n.module'
import { IconsModule } from '../icons/icons.module'
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LogoPathPipe } from './pipes/logo-path.pipe'

const components = [
	HeaderComponent,
	MenuButtonComponent,
	ProgressBarComponent,
	IconThemePipe,
	LogoPathPipe
]

const modules = [
	CommonModule,
	RouterModule,
	HttpClientModule,
	I18nModule,
	IconsModule,
]

export function themeFactory(themeService: ThemeHandlerService) {
	return () => themeService.setThemeOnStart()
}

@NgModule({
	declarations: [
		...components,
	],
	imports: [
		...modules,
	],
	exports: [
		...components,
		...modules
	],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeHandlerService], multi: true }
	]
})
export class SharedModule { }
