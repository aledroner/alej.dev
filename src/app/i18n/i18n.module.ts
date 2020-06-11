import { isPlatformBrowser } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Inject, NgModule, PLATFORM_ID } from '@angular/core'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule]
})
export class I18nModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    translate: TranslateService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.addLangs(['es', 'en'])
      const browserLang = translate.getBrowserLang()
      translate.use(browserLang.match(/es|en/) ? browserLang : 'es')
    }
  }
}

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient)
}
