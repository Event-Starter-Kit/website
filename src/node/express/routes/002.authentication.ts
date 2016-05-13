import * as express from "express";
import * as passport from "passport";
import { SpeakerRepository } from "../../data/repositories/speakerRepository";
import { RouteBase } from "./helpers/routeBase";
import {Configuration} from "../../data/models/configuration";

export class Authentication extends RouteBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration, true);
    }

	public configureRoutes() {
		this.logger.debug("Configuring routes for Authentication Controller.");

		this.app.get("/api/auth/test", async (req: express.Request, res: any) => {
			try {
				let response = await new SpeakerRepository().getTalks();
				res.json(response);
			} catch (error) {
				this.logger.error(error);
			}
		});

		this.app.get("/auth/logout", (req: express.Request, res: express.Response) => {
			req.logout();
			res.redirect("/");
		});

		this.app.get("/api/auth/userInfo", this.isLoggedIn, (req: express.Request, res: express.Response) => {
			res.json(req.user());
		});

		this.configureLocal();
		this.configureFacebook();
		this.configureTwitter();
		this.configureGoogle();
	}

	private configureLocal() {
		// show the login form
		this.app.get("/login", (req: any, res: any) => {
            res.render("frontoffice/login", { message: req.flash("loginMessage") });
        });

		// process the login form
        this.app.post("/login", passport.authenticate("local-login", {
            successRedirect: "/profile", // redirect to the secure profile section
            failureRedirect: "/login", // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
        }));

		// show the signup form
        this.app.get("/signup", (req: any, res: any) => {
            res.render("frontoffice/singup", { message: req.flash("signupMessage") });
        });

        // process the signup form
        this.app.post("/signup", passport.authenticate("local-signup", {
            successRedirect: "/profile", // redirect to the secure profile section
            failureRedirect: "/signup", // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
        }));
	}

	private configureFacebook(): void {
		// send to facebook to do the authentication
        this.app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

        // handle the callback after facebook has authenticated the user
        this.app.get("/auth/facebook/callback",
            passport.authenticate("facebook", {
                failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));
	}

	private configureTwitter(): void {
		// send to twitter to do the authentication
        this.app.get("/auth/twitter", passport.authenticate("twitter", { scope: "email" }));

        // handle the callback after twitter has authenticated the user
        this.app.get("/auth/twitter/callback",
            passport.authenticate("twitter", {
				failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));
	}

	private configureGoogle(): void {
		// send to google to do the authentication
        this.app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

        // the callback after google has authenticated the user
        this.app.get("/auth/google/callback",
            passport.authenticate("google", {
                failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));
	}
}
