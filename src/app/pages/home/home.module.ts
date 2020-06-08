import { NgModule } from '@angular/core'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SharedModule } from '../../shared/shared.module'
import { PresentationComponent } from './components/presentation/presentation.component'

@NgModule({
	declarations: [HomeComponent, PresentationComponent],
	imports: [
		HomeRoutingModule,
		SharedModule
	]
})
export class HomeModule { }
