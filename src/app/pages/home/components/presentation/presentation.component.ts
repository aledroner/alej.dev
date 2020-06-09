import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'

import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'ale-presentation',
	templateUrl: './presentation.component.html',
	styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

	socialMenu$: Observable<object>

	constructor(
		public data: DataService
	) { }

	ngOnInit(): void {
		this.socialMenu$ = this.data.socialMenu
	}
}
