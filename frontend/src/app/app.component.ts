import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Select } from 'primeng/select';
import { CityService } from './services/city.service';
import { ICity } from './models/city.interface';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	map!: HTMLElement;

	cities: ICity[] = [];

	constructor(private cityService: CityService) {

	}

	ngOnInit(): void {
		this.cities = this.cityService.cities;
		console.log(this.cities);


		this.map = document.getElementById('layer16')!;
		let counter = 1;
		this.cities.forEach((city) => {
			setTimeout(() => {
				const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.setAttribute('d', city.path);
				path.setAttribute('id', String(city.id));
				path.setAttribute('class', 'path');
				this.map.appendChild(path);
			}, counter * 500);
			counter++
		});
	}

	getNeighbors() {
		let neigs = this.cityService.findNeighbors(34);
		console.log(neigs);

	}
}
