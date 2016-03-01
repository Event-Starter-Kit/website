import { Environment }  from "../config/environment";
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
            if (Environment.IsDevEnvironment) {
                this.ColoredConsole();
            }
            else {
                this.File();
            }

            LoggerFactory.winston.info("Logger Up & Running....");
            LoggerFactory.winston.info("Environment: " + (Environment.IsDevEnvironment ? "Dev" : "Production"));
        }
    }

    private static File() {
        LoggerFactory.winston = new winston.Logger({
            transports: [
                new winston.transports.File({
                    level: "info",
                    filename: "./public/logs/all-logs.log",
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880, //5MB
                    maxFiles: 5,
                    colorize: false
                })
            ],
            exitOnError: false
        });
    }

    private static ColoredConsole() {
        LoggerFactory.winston = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: "debug",
                    handleExceptions: false,
                    json: false,
                    colorize: true
                }),

            ],
            exitOnError: false
        });
    }
}
