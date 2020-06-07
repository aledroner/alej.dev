import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'logoPath'
})
export class LogoPathPipe implements PipeTransform {

	transform(value: boolean, ...args: string[]): string {
		return `assets/icons/logo${value ? '-' + args[0] : ''}.svg`
	}
}
