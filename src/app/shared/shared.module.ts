import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { I18nModule } from '../i18n/i18n.module'
import { IconsModule } from '../icons/icons.module'
import { HeaderComponent } from './components/header/header.component'
import { IconListComponent } from './components/icon-list/icon-list.component'
import { MenuButtonComponent } from './components/menu-button/menu-button.component'
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component'
import { IconThemePipe } from './pipes/icon-theme.pipe'
import { LogoPathPipe } from './pipes/logo-path.pipe'
import { ThemeHandlerService } from './services/theme-handler.service'

const components = [
  HeaderComponent,
  MenuButtonComponent,
  ProgressBarComponent,
  IconListComponent,
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
    ...modules,
    IconListComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeHandlerService], multi: true }
  ]
})
export class SharedModule { }
