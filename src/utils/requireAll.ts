import {loggerBaseClass} from '../loggerBaseClass';
import * as fs from 'fs';

export class requireAll extends loggerBaseClass {
    constructor() {
        super();
    }

    requireAll(foldername: string): any[] {
        let classes : any[] = [];

        fs.readdirSync(foldername)
            .forEach((file) => {
                if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
                    var name = file.replace('.js', '');

                    this.logger.debug("Requiring '" + name + "' from '" + foldername + "/" + file + "''");

                    var ctrl = require(foldername + file);

                    classes.push(ctrl);
                }
            });

        return classes;
    }
}