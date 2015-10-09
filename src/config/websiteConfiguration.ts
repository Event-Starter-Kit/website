export class websiteConfiguration {
	title: string = "You conference name";
	description: string = "You event description";
	tags: string[] = ["tag1", "tag2", "tag3"];
	tracks: track[] ;

	constructor() {
		this.tracks.push(new track(1, "track1", 4, 100));
		this.tracks.push(new track(2, "track2", 4, 100));
		this.tracks.push(new track(3, "track3", 4, 100));
		this.tracks.push(new track(4, "track4", 4, 100));
	}
}

class track {
	constructor(trackNumber: number,
		name: string,
		numberOfSlot: number,
		numberOfSeats: number
		) {
	}
	trackNumber: number;
	name: string;
	numberOfSlot: number;
	numberOfSeats: number;
}