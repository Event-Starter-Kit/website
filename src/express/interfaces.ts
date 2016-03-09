import { LoggerBaseClass } from "../logging/loggerBaseClass";

export module Interfaces {
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
}
