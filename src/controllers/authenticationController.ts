import * as express from "express";
import * as passport from "passport";
import { SpeakerRepository } from "../data/speakerRepository";
import { ControllerBase } from "./helpers/controllerBase";
import {Configuration} from "../data/models/configuration";

export class AuthenticationController extends ControllerBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration);

		this.app.get("/auth/test", async (req: express.Request, res: any) => {
			try {
				let response = await new SpeakerRepository().getTalks();
				res.json(response);
			} catch (error) {
				this.logger.error(error);
			}
		});

		this.app.get("/auth/protected", this.isLoggedIn, (req: express.Request, res: express.Response) => {
			res.json({
				user: req.user,
			});
		});

		this.app.get("/auth/logout", (req: express.Request, res: express.Response) => {
			req.logout();
			res.redirect("/");
		});

		this.app.get("/auth/userInfo", this.isLoggedIn, (req: express.Request, res: express.Response) => {
			res.send(req.user());
		});

        // ---------------------------------------------
        // FACEBOOK --------------------------------
        // ---------------------------------------------

        // send to facebook to do the authentication
        app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

        // handle the callback after facebook has authenticated the user
        app.get("/auth/facebook/callback",
            passport.authenticate("facebook", {
                failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));

        // ---------------------------------------------
        // TWITTER ----------------------------------
        // ---------------------------------------------

        // send to twitter to do the authentication
        app.get("/auth/twitter", passport.authenticate("twitter", { scope: "email" }));

        // handle the callback after twitter has authenticated the user
        app.get("/auth/twitter/callback",
            passport.authenticate("twitter", {
				failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));

        // ---------------------------------------------
        // GOOGLE -----------------------------------
        // ---------------------------------------------

        // send to google to do the authentication
        app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

        // the callback after google has authenticated the user
        app.get("/auth/google/callback",
            passport.authenticate("google", {
                failureRedirect: "/",
                successRedirect: "/auth/userInfo",
            }));
    }
}
