import { LoggerBaseClass } from "../loggerBaseClass";
import { Folder } from "../utils/folder";
import { HostingEnvironment } from "./HostingEnvironment";
import * as credentials from "../config/credentials";
import * as Express from "express";
import * as Path from "path";
import * as Compression from "compression";
import * as CookieParser from "cookie-parser";
import * as Session from "express-session";
import * as Passport from "passport";
import { PassportConfig } from "./PassportConfig";

const ExpressValidator = require("express-validator");

export class ExpressConfig extends LoggerBaseClass {
    private app: Express.Express;

    constructor(app: Express.Express) {
        super();

        this.app = app;
    }

    public Configure() {

        this.configureCompression();
        this.configurePublicFolder();
        this.configureBodyParser();
        this.configureValidator();
        this.configureCookieParser();
        this.configureSession();
        this.configureLog();
        this.configurePassport();

        let controllerFolder = Path.dirname(module.parent.filename) + "/controllers/";
        let ctrls = new Folder().RequireAll(controllerFolder);

        ctrls.forEach((ctrl) => {
            new ctrl[Object.keys(ctrl)[0]](this.app);
        });

        this.configure404();
        this.configure500();
    }

    private configureCompression() {
        this.Logger.debug("Enabling GZip compression.");

        this.app.use(Compression({
            threshold: 512,
        }));
    }

    private configurePublicFolder() {
        this.Logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
        let publicFolder = Path.dirname(module.parent.filename) + "/public";
        let oneYear = 31557600000;
        this.app.use(Express.static(publicFolder, {
            maxAge: oneYear,
        }));
    }

    private configureBodyParser() {
        this.Logger.debug("Setting parse urlencoded request bodies into req.body.");
        let bodyParser = require("body-parser");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
    }

    private configureValidator() {
        this.Logger.debug("Enabling validation....");
        this.app.use(ExpressValidator());
    }

    private configureCookieParser() {
        this.Logger.debug("Enabling cookie parser....");
        this.app.use(CookieParser());
    }

    private configureSession() {
        this.Logger.debug("Enabling session....");
        this.app.use(Session({
            cookie: { maxAge: 3600000 * 12 },
            resave: false,
            saveUninitialized: true,
            secret: credentials.Session.SecretPhrase,
            unset: "destroy",
        }));
    }

    private configureLog() {
        this.Logger.debug("Overriding 'Express' logger");
        this.app.use(require("morgan")("combined", {
            "stream": {
                write: (message: string, encoding: any) => {
                    this.Logger.info(message);
                },
            },
        }));
    }

    private configurePassport() {
        let pspConfig = new PassportConfig(Passport);

        this.Logger.debug("Adding Facebook Authentication.....");
        pspConfig.ConfigureFacebookStrategy();

		this.Logger.debug("Adding Twitter Authentication.....");
        pspConfig.ConfigureTwitterStrategy();

		this.Logger.debug("Adding Google Authentication.....");
        pspConfig.ConfigureTwitterStrategy();

        this.Logger.debug("Passport initializing.....");
        this.app.use(Passport.initialize());

        this.Logger.debug("Passport session.....");
        this.app.use(Passport.session());
    }

    private configure404() {
        this.Logger.debug("Configuring 404 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			if (err) {
				return next();
			}

            this.Logger.debug("Unable to locate the specified url: " + req.url);
            res.status(404).json({ Message: "404 - NotFound" });
        });
    }

    private configure500() {
        this.Logger.debug("Configuring 500 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            this.Logger.error(err);

            let responseMessage = { message: HostingEnvironment.IsDevelopment ? err.stack : "500 - Internal Server Error" };

			res.status(500).json({ error: responseMessage });

        });
    }
}
