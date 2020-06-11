import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'

import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ale-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
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
