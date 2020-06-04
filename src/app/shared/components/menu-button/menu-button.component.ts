import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'ale-menu-button',
	templateUrl: './menu-button.component.html',
	styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

	@Input() active: boolean

	constructor() { }

	ngOnInit(): void { }

}
