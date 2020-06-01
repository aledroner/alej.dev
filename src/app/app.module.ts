import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { SharedModule } from './shared/shared.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function httpTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http)
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		TranslateModule.forRoot({
			defaultLanguage: 'es',
			loader: { provide: TranslateLoader, useFactory: httpTranslateLoader, deps: [HttpClient] }
		}),
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
