import * as express from "express";
import * as passport from "passport";
import { User } from "../Data/Models/User";
import { SpeakerRepository } from "../Data/SpeakerRepository";
import { ControllerBase } from "./helpers/controllerBase";

export class AuthenticationController extends ControllerBase {
	constructor(app: express.Express) {
        super(app);

		this.app.get("/auth/test", async (req: express.Request, res: Express.Response) => {
			try {
				let response = await new SpeakerRepository().GetTalks();
				res.json(response);
			} catch (error) {
				this.Logger.error(error);
			}
		});

		this.app.get("/auth/protected", this.IsLoggedIn, (req: express.Request, res: express.Response) => {
			res.json({
				user: req.user,
			});
		});

		this.app.get("/auth/logout", (req: express.Request, res: express.Response) => {
			req.logout();
			res.redirect("/");
		});

		this.app.get("/auth/userInfo", this.IsLoggedIn, (req: express.Request, res: express.Response) => {
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
