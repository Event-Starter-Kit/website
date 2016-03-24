import { Mailer } from "../setup/credentials";
import { NotEmpty, NotEmptyArray, IsEmail } from "validator.ts/decorator/Validation";
import { Validator } from "validator.ts/Validator";
import { ValidationError } from "../errors/validationError";
import { LoggerBaseClass } from "../logging/loggerBaseClass";
const Nodemailer = require("nodemailer");
const EmailTemplates = require("swig-email-templates");

export class EmailService extends LoggerBaseClass {
	private transporter: any;
	private validator: Validator;
	private emailTemplates: any;
	private smtpOptions: any;

	constructor() {
		super();

		this.smtpOptions = {
			host: Mailer.host,
			port: Mailer.port,
			secure: Mailer.secureConnection,
			auth: {
				user: Mailer.username,
				pass: Mailer.password,
			},
			requireTLS: Mailer.requireTLS,
		};
		this.transporter = Nodemailer.createTransport(this.smtpOptions);
		this.validator = new Validator();
		this.emailTemplates = new EmailTemplates();
	}

	public send(message: EmailMessage): void;
	public send(message: EmailTemplate): void;
	public send(message: EmailMessage | EmailTemplate): void {
		let errors = this.validator.validate(message);

		if (errors && errors.length > 0) {
			throw new ValidationError(errors);
		}

		if (message instanceof EmailMessage) {
			this.sendEmail(message);
		} else {
			this.sendEmailFromTemplate(message);
		}
	}

	private sendEmailFromTemplate(message: EmailTemplate) {

		let templatePath = __dirname + "/../views/emails/" + message.templateId + ".html";

		let sendPwdReminder = this.transporter.templateSender({
			render: (context: any, callback: any) => {
				this.emailTemplates.render(templatePath, message.arguments, (err: any, html: any, text: any) => {
					if (err) {
						this.logger.error(err);
						throw err;
					}
					callback(null, {
						html: html,
						text: text,
					});
				});
			},
		});

		sendPwdReminder({
			from: message.from,
			to: message.to,
			cc: message.cc,
			bcc: message.bcc,
			subject: message.subject,
		}, this.smtpOptions, (err: any, info: any) => {
			if (err) {
				throw err;
			};

			this.logger.debug("Email sent");
		});
	}

	private sendEmail(message: EmailMessage) {
		this.transporter.sendMail(message, (err: any) => {
			if (err) {
				throw err;
			};

			this.logger.debug("Email sent");
		});
	}
}

class EmailBase {
	constructor() {
		this.to = new Array<string>();
		this.cc = new Array<string>();
		this.bcc = new Array<string>();
		this.from = Mailer.sender;
	}

	@NotEmpty()
	public subject: string;

	@NotEmptyArray()
	public to: string[];

	public cc: string[];
	public bcc: string[];

	public isHtml: boolean;

	@IsEmail()
	public from: string;
}

export class EmailMessage extends EmailBase {
	@NotEmpty()
	public text: string;

	constructor() {
		super();
	}
}

export class EmailTemplate extends EmailBase {
	public templateId: string;
	public arguments: Object;

	constructor() {
		super();
		this.isHtml = true;
	}
}


