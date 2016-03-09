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

        Fs.readdirSync(foldername)
            .forEach((file) => {
                let f = Path.parse(file);

                if (f.ext === ".js" && file !== "index.js") {
                    this.logger.debug("Importing '" + f.name + "' from '" + foldername + "/" + file + "''");

                    let ctrl = require(foldername + file);

                    classes.push(ctrl);
                }

            });

        return classes;
    }
}
