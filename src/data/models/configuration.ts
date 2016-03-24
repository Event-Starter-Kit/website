import {Entitybase} from "./shared/entitybase";
import {NotEmpty, NotEmptyArray, ValidateNested, MinNumber, IsUrl} from "validator.ts/decorator/Validation";

export class Configuration extends Entitybase {
	@NotEmpty()
	public name: string;

	@NotEmpty()
	public description: string;

	@NotEmptyArray()
	public tags: string[];

	@ValidateNested()
	public socials: Socials;

	public days: Day[];

	constructor() {
		super();
		this.days = new Array<Day>();
	}

	public static createDefaultConfiguration(): Configuration {
		let conf = new Configuration();
		conf.name = "your conference name";
		conf.description = "Your conference description";
		conf.tags = ["tag1", "tag2", "tag3"];

		let day1 = new Day();
		day1.day = Date.now();
		day1.location = "Corso Vittorio Emanuele II, Milano, Metropolitan City of Milan, Italy";

		return conf;
	}
}

class Day {
	public day: number;
	public location: string;
	public tracks: Track[];

	constructor() {
		this.tracks = new Array<Track>();
	}

	public addTrack(trackNumber: number,
		name: string,
		numberOfSlot: number,
		numberOfSeats: number) {
		this.tracks.push(new Track(trackNumber, name, numberOfSlot, numberOfSeats));
	}

	public removeTrack(trackNumber: number) {
		let itemIndex: number = -1;

		for (let i = 0; i < this.tracks.length; i++) {
			if (this.tracks[i].trackNumber === trackNumber) {
				itemIndex = i;
				break;
			}
		}

		this.tracks.splice(itemIndex);
	}
}

class Track {
	constructor(trackNumber: number,
		name: string,
		numberOfSlot: number,
		numberOfSeats: number) {
		this.trackNumber = trackNumber;
		this.name = name;
		this.numberOfSlot = numberOfSlot;
		this.numberOfSeats = numberOfSeats;
	}

	@MinNumber(1)
	public trackNumber: number;

	@NotEmpty()
	public name: string;

	@MinNumber(1)
	public numberOfSlot: number;

	@MinNumber(1)
	public numberOfSeats: number;
}

class Socials {
	@IsUrl()
	public twitterUri: string;

	@IsUrl()
	public googlePlusUri: string;

	@IsUrl()
	public facebookUri: string;

	@IsUrl()
	public githubUri: string;

	@IsUrl()
	public vimeoUri: string;

	@IsUrl()
	public youtubeUri: string;
}
