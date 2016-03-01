import * as Express from "express";
import { ControllerBase } from "./helpers/controllerBase";
import { ScheduleData } from "../data/scheduleData";
import { HomeViewModel } from "./viewModel/homeViewModel";

export class HomeController extends ControllerBase {
    private scheduleData: ScheduleData;

    constructor(app: Express.Express) {
        super(app);

        this.scheduleData = new ScheduleData();
        this.home();
    }

    private home() {
        this.app.get("/", (req, res) => {
            this.scheduleData.GetTalks()
                .then(output => {
                    let model = new HomeViewModel(req);
                    model.talks = output;
                     res.render("home/index", model);
                })
                .catch((err:Error) => {
                    throw new Error(err.message);
                });
        });
    }
}
