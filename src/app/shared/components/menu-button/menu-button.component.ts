import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ale-menu-button',
	templateUrl: './menu-button.component.html',
	styleUrls: ['./menu-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent implements OnInit {

	@Input() active: boolean
	@Input() homeRoute: boolean

	constructor() { }

	ngOnInit(): void { }

}
