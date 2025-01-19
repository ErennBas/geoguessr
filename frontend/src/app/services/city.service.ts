import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICity, INeighbor } from '../models/city.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CityService {
	cities: ICity[] = [];
	neighbors: INeighbor[] = [];

	constructor(private http: HttpClient) {
		this.getCities().subscribe(res => { this.cities = res; });
		this.getNeighbors().subscribe(res => { this.neighbors = res; });
	}

	getCities(): Observable<ICity[]> {
		return this.http.get<ICity[]>('cities.json');
	}

	getNeighbors(): Observable<INeighbor[]> {
		return this.http.get<INeighbor[]>('neighbors.json');
	}

	findNeighbors(id: number): ICity[] {
		let cities: ICity[] = [];

		const neighbors = this.neighbors.find(city => city.id === id);
		neighbors?.cities.forEach(id => {
			cities.push(this.findOneCity(id));
		});

		return cities;
	}

	findOneCity(id: number): ICity {
		return this.cities.find(city => city.id === id)!;
	}
}
