import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'ale-presentation',
	templateUrl: './presentation.component.html',
	styleUrls: ['./presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent implements OnInit {

	socialMenu$: Observable<object>

	@Output() clickScrollButton: EventEmitter<object> = new EventEmitter<object>()

	constructor(
		public data: DataService
	) { }

	ngOnInit(): void {
		this.socialMenu$ = this.data.socialMenu
	}
}
