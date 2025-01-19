export interface ICity {
	id: number;
	name: string;
	path: string;
}

export interface INeighbor {
	id: number;
	cities: [number]
}
