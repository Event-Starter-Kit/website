import { LoggerBaseClass } from "../logging/loggerBaseClass";
import { Folder } from "../utils/folder";
import { HostingEnvironment } from "../utils/hostingEnvironment";
import * as credentials from "../setup/credentials";
import {ConfigurationRepository} from "../data/configurationRepository";
import {Configuration} from "../data/models/configuration";
import * as Express from "express";
import * as Path from "path";
import * as Compression from "compression";
import * as CookieParser from "cookie-parser";
import * as Session from "express-session";
import * as Passport from "passport";
import * as swig from "swig";
import * as path from "path";
import { PassportConfig } from "./passportConfig";

const ExpressValidator = require("express-validator");

export class ExpressConfig extends LoggerBaseClass {
    private app: Express.Express;

    constructor(app: Express.Express) {
        super();

        this.app = app;
    }

    public async configure(): Promise<void> {
        this.configureCompression();
        this.configurePublicFolder();
        this.configureBodyParser();
        this.configureValidator();
        this.configureCookieParser();
        this.configureSession();

        this.configureLog();
		this.configureViewEngine();
        this.configurePassport();

        let controllerFolder = Path.dirname(module.parent.filename) + "/controllers/";
        let ctrls = new Folder().requireAll(controllerFolder);
		let configurationRepository = new ConfigurationRepository();
		let configuration: Configuration;
		try {
			configuration = await configurationRepository
				.getConfiguration();
		} catch (error) {
			this.logger.error(error);
			return;
		}

		this.logger.debug("Site configuration", configuration);

        ctrls.forEach((ctrl) => {
            new ctrl[Object.keys(ctrl)[0]](this.app, configuration);
        });

        this.configure404();
        this.configure500();
    }

    private configureCompression() {
        this.logger.debug("Enabling GZip compression.");

        this.app.use(Compression({
            threshold: 512,
        }));
    }

    private configurePublicFolder() {
        this.logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
        let publicFolder = Path.dirname(module.parent.filename) + "/public";
        let oneYear = 31557600000;
        this.app.use(Express.static(publicFolder, {
            maxAge: oneYear,
        }));
    }

    private configureBodyParser() {
        this.logger.debug("Setting parse urlencoded request bodies into req.body.");
        let bodyParser = require("body-parser");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
    }

    private configureValidator() {
        this.logger.debug("Enabling validation....");
        this.app.use(ExpressValidator());
	   }

	private configureViewEngine() {
		this.logger.debug("Configuring view engine....");

		this.app.engine("html", swig.renderFile);
		let viewPath = path.dirname(module.parent.filename) + "/Views";

		this.logger.debug("Configuring view path: " + viewPath);
		this.app.set("view engine", "html");
		this.app.set("views", viewPath);
	}

    private configureCookieParser() {
        this.logger.debug("Enabling cookie parser....");
        this.app.use(CookieParser());
    }

    private configureSession() {
        this.logger.debug("Enabling session....");
        this.app.use(Session({
            cookie: { maxAge: 3600000 * 12 },
            resave: false,
            saveUninitialized: true,
            secret: credentials.Session.secretPhrase,
            unset: "destroy",
        }));
    }

    private configureLog() {
        this.logger.debug("Overriding 'Express' logger");
        this.app.use(require("morgan")("combined", {
            "stream": {
                write: (message: string, encoding: any) => {
                    this.logger.info(message);
                },
            },
        }));
    }

    private configurePassport() {
        let pspConfig = new PassportConfig(Passport);

        this.logger.debug("Adding Facebook Authentication.....");
		      pspConfig.configureFacebookStrategy();

		this.logger.debug("Adding Twitter Authentication.....");
		      pspConfig.configureTwitterStrategy();

		this.logger.debug("Adding Google Authentication.....");
        pspConfig.configureTwitterStrategy();

        this.logger.debug("Passport initializing.....");
        this.app.use(Passport.initialize());

        this.logger.debug("Passport session.....");
        this.app.use(Passport.session());
    }

    private configure404() {
		this.logger.debug("Configuring 404 page");
		this.app.use((req: Express.Request, res: Express.Response) => {
            this.logger.debug("Unable to locate the specified url: " + req.url);
            res.status(404).json({ Message: "404 - NotFound" });
        });
    }

    private configure500() {
        this.logger.debug("Configuring 500 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            this.logger.error(err);

			let responseMessage = { message: HostingEnvironment.isDevelopment ? err.stack : "500 - Internal Server Error" };

			res.status(500).json({ error: responseMessage });

        });
    }
}
