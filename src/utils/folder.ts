import {LoggerBaseClass} from "../logging/loggerBaseClass";
import * as Fs from "fs";
import * as Path from "path";

export class Folder extends LoggerBaseClass {
    constructor() {
        super();
    }

    public requireAll(foldername: string): any[] {

        this.logger.debug("Reading " + foldername + " .....");

        let classes: any[] = [];

        Fs.readdirSync(foldername).map((v) => {
			return {
				name: v,
				time: Fs.statSync(foldername + v).mtime.getTime(),
			};
		})
			.sort(function(a, b) { return a.time - b.time; })
			.map(function(v) { return v.name; })
            .forEach((file) => {
                let f = Path.parse(file);

                if (f.ext === ".js" && file !== "index.js") {
                    this.logger.debug("Importing '" + f.name + "' from '" + foldername + "/" + file + "''");

                    let module = require(foldername + file);

					this.logger.debug("Module " + file + " imported");

                    classes.push(module);
                }

            });

        return classes;
    }
}
