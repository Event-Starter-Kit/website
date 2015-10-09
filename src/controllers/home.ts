import * as express from 'express';
import { controllerBase } from './helpers/controllerBase';
import { scheduleData } from '../data/scheduleData';
import { homeViewModel } from './viewModel/homeViewModel';

export class homeController extends controllerBase {
    private scheduleData: scheduleData;

    constructor(app: express.Express) {
        super(app);

        this.scheduleData = new scheduleData();
        this.home();
    }

    private home() {
        this.app.get("/", (req, res) => {
           
            this.scheduleData.getTalks()
                .then(output => {
                    let model = new homeViewModel(req);
                    model.talks = output;
                    
                     res.render("home/index", model);
                })
                .catch((err:Error) => {
                    throw new Error(err.message);
                });
        });
    }
}