import { Component, Input } from '@angular/core'

@Component({
  selector: 'ale-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {

  @Input() active: boolean
  @Input() homeRoute: boolean

  constructor() { }
}
