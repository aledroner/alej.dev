import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { IconButton } from '../../models/data.model'

@Component({
	selector: 'ale-icon-list',
	templateUrl: './icon-list.component.html',
	styleUrls: ['./icon-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconListComponent {

	@Input() data: IconButton[]

	constructor() { }
}
