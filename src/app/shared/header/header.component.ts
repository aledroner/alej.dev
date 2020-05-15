import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'ale-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Input() title: string = 'alej.dev'

	constructor() { }

	ngOnInit(): void { }

}
