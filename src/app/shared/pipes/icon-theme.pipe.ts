import { Pipe, PipeTransform } from '@angular/core'

import { ThemeMode } from '../services/theme-handler.service'

@Pipe({
  name: 'iconTheme'
})
export class IconThemePipe implements PipeTransform {

  transform(value: ThemeMode): string {
    return value === ThemeMode.DARK ? 'sun' : 'moon'
  }
}
