import { HostingEnvironment }  from "../config/HostingEnvironment";
import * as winston from "winston";

export class LoggerFactory {
	private static winston: winston.LoggerInstance;
    private static isConfigured: boolean = false;

	public static Logger(): winston.LoggerInstance {
        LoggerFactory.Configure();
        return LoggerFactory.winston;
    }

    private static Configure() {
        if (!this.isConfigured) {
            if (HostingEnvironment.IsDevelopment) {
                this.ColoredConsole();
            } else {
                this.File();
            }

			this.isConfigured = true;

            LoggerFactory.winston.info("Logger Up & Running....");
        }
    }

    private static File() {
        LoggerFactory.winston = new winston.Logger({
            exitOnError: false,
			transports: [
				new winston.transports.File({
                    colorize: false,
					filename: "./public/logs/all-logs.log",
					handleExceptions: true,
					json: true,
					level: "info",
                    maxFiles: 5,
                    maxsize: 5242880,
                }),
            ],
        });
    }

    private static ColoredConsole() {
        LoggerFactory.winston = new winston.Logger({
			exitOnError: false,
            transports: [
                new winston.transports.Console({
					colorize: true,
					handleExceptions: false,
					json: false,
                    level: "debug",
                }),
            ],
        });
    }
}
