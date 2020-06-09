import { Observable } from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { IconButton, Route } from '../models/data.model'

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private readonly dataPath: string = './assets/data'

	constructor(
		private http: HttpClient
	) { }

	public get mainMenu(): Observable<object> {
		return this.http.get<Route[]>(`${this.dataPath}/main-menu.json`)
	}

	public get socialMenu(): Observable<object> {
		return this.http.get<IconButton[]>(`${this.dataPath}/social-menu.json`)
	}
}
