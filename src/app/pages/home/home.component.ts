import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

@Component({
	selector: 'ale-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	@ViewChild('mainWrapper') mainWrapper: ElementRef

	constructor() { }

	ngOnInit(): void { }

	scrollToMain(): void {
		this.mainWrapper.nativeElement.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		})
	}
}
