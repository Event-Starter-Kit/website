import {loggerBaseClass} from '../loggerBaseClass';
import * as fs from 'fs';
import * as path from 'path';

export class requireAll extends loggerBaseClass {
    constructor() {
        super();
    }

    requireAll(foldername: string): any[] {

        this.logger.debug("Reading " + foldername + " .....");

        let classes: any[] = [];

        fs.readdirSync(foldername)
            .forEach((file) => {

                var f  = path.parse(file);
                
                if (f.ext == ".js" && file !== 'index.js') {
                    this.logger.debug("Requiring '" + f.name + "' from '" + foldername + "/" + file + "''");

                    var ctrl = require(foldername + file);

                    classes.push(ctrl);
                }

            });

        return classes;
    }
}