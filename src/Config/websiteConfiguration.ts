export class WebsiteConfiguration {
	public Title: string = "You conference name";
	public Description: string = "You event description";
	public Tags: string[] = ["tag1", "tag2", "tag3"];
	public Tracks: Track[] ;

	constructor() {
		this.Tracks.push(new Track(1, "track1", 4, 100));
		this.Tracks.push(new Track(2, "track2", 4, 100));
		this.Tracks.push(new Track(3, "track3", 4, 100));
		this.Tracks.push(new Track(4, "track4", 4, 100));
        this.Tracks.push(new Track(5, "track5", 4, 100));
        this.Tracks.push(new Track(6, "track6", 4, 100));
	}
}

class Track {
	constructor(trackNumber: number,
		name: string,
		numberOfSlot: number,
		numberOfSeats: number) {
		this.TrackNumber = trackNumber;
		this.Name = name;
		this.NumberOfSlot = numberOfSlot;
		this.NumberOfSeats = numberOfSeats;
	}

	public TrackNumber: number;
	public Name: string;
	public NumberOfSlot: number;
	public NumberOfSeats: number;
}
