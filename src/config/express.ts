import { LoggerBaseClass } from "../loggerBaseClass";
import { Folder } from "../utils/folder";

import * as Credentials from "../config/credentials";
import * as Express from "express";
import * as Path from "path";
import * as Compression from "compression";
// Changed d.ts with this https://github.com/Microsoft/TypeScript/issues/3612#issuecomment-114822973
import * as ExpressValidator from "express-validator"; 
import * as CookieParser from "cookie-parser";
import * as Session from "express-session";
import * as Csrf from "csurf";
import * as Passport from "passport";

export class ExpressConfig extends LoggerBaseClass {
    private app: Express.Express;

    constructor(app: Express.Express) {
        super();

        this.app = app;
    }

    public Configure() {
        this.configureViewEngine();
        this.configureViewFolder();
        this.configureCompression();
        this.configurePublicFolder();
        this.configureBodyParser();
        this.configureValidator();
        this.configureCookieParser();
        this.configureSession();
        this.configureCsurf();
        this.configureLog();;

        let controllerFolder = Path.dirname(module.parent.filename) + "/controllers/";
        let ctrls = new Folder().RequireAll(controllerFolder);

        ctrls.forEach((ctrl) => {
            new ctrl[Object.keys(ctrl)[0]](this.app);
        });

		this.configurePassport();
        this.configure404();
        this.configure500();
    }

    private configureViewEngine() {
        this.Logger.debug("Setting 'Vash' as view engine");
        this.app.set("view engine", "vash");
    }

    private configureViewFolder() {
        this.Logger.debug("Setting 'Views' folder");
        let viewsFolder = Path.dirname(module.parent.filename) + "/views";
        this.app.set("views", viewsFolder);
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
            extended: true,
        }));
    }

    private configureValidator() {
        this.Logger.debug("Enabling validation....");
        this.app.use(ExpressValidator.default());
    }

    private configureCookieParser() {
        this.Logger.debug("Enabling cookie parser....");
        this.app.use(CookieParser());
    }

    private configureSession() {
        this.Logger.debug("Enabling session....");
        this.app.use(Session({
			resave: true,
			saveUninitialized: true,
            secret: Credentials.Session.SecretPhrase,
        }));
    }

    private configureCsurf() {
        this.Logger.debug("Enabling csurf....");
        this.app.use(Csrf());
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

	private configurePassport(){
		this.app.use(Passport.initialize());
	}

    private configure404() {
        this.Logger.info("Configuring 404 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Function) => {
            this.Logger.debug("Unable to locate the specified url: " + req.url);
            res.statusCode = 404;
            res.render("404");
        });
    }

    private configure500() {
        this.Logger.info("Configuring 500 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Function) => {
            this.Logger.error(err.stack);
            res.statusCode = 500;
            res.render("500");
        });
    }
}
