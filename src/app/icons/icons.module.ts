import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
	faGithub,
	faTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
	faMoon,
	faSun
} from '@fortawesome/free-solid-svg-icons'

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FontAwesomeModule
	],
	exports: [
		FontAwesomeModule
	]
})
export class IconsModule {
	constructor(
		faConfig: FaConfig,
		library: FaIconLibrary
	) {
		faConfig.defaultPrefix = 'fas'
		library.addIcons(faGithub, faMoon, faSun, faTwitter)
	}
}
