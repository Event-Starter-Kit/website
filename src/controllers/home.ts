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
        var pippo = 2;
        this.app.get("/", (req, res) => {
            let model = new homeViewModel(req);

            this.scheduleData.getTalks()
                .then(output => {
                    model.talks = output;
                    
                     res.render("home/index", model);
                });
        });
    }
}