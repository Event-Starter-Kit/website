import * as express from "express";
import * as credentials from "../config/credentials";
import { ControllerBase } from "./helpers/controllerBase";
import {Configuration} from "../data/models/configuration";

const Mailchimp = require("mailchimp-api").Mailchimp;

export class HomeController extends ControllerBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration);

		app.post("/api/notify/join", async (req: any, res: any) => {
			this.Logger.debug("email value: " + req.body.email);

            req.assert("email", "Field required").notEmpty();
            req.assert("email", "Invalid email format").isEmail();

			let mlc = new Mailchimp(credentials.Mailchimp.Key);

			let errors = req.validationErrors();

            if (errors) {
                this.Logger.warn("Wrong request: ", errors);
                return res.statu(400).json(errors);
            }

			try {
				await mlc.lists.subscribe({
					email: {
						email: req.body.email,
					},
					id: credentials.Mailchimp.ListId,
				});

				res.send({
					message: "Thanks for signing up!",
				});
			} catch (error) {
				if (error) {
					if (error.code === 214) {
						this.Logger.debug("User already subscribed");
						res.status(400).send({
							error: "User already subscribed",
						});
					} else {
						this.Logger.error("There is an error calling MailChimp: " + error.error);
						res.status(500).send({
							error: "Something went wrong. Please try again. " + error.error,
						});
					}
				}
			}
		});
	}
}
