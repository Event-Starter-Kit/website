import { LoggerBaseClass } from "./logging/loggerBaseClass";

export abstract class ConfigurationModule<T> extends LoggerBaseClass {
	public enabled: boolean;
	public app: T;
	public abstract setup(): void;

	constructor(app: T, enabled: boolean) {
		super();

		this.app = app;
		this.enabled = enabled;
	}
}

export abstract class ConfigurationCronJob extends LoggerBaseClass {
	public enabled: boolean;
	public name: string;
	public cronPattern: string;
	public abstract run(): void;
}

export abstract class ConfigurationScheduledJob extends LoggerBaseClass {
	public enabled: boolean;
	public name: string;
	public date: Date;
	public abstract run(): void;
}
