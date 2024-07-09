import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as ReportsController from "../controllers/ReportsController";

const reportsRoutes = Router();

reportsRoutes.get("/generalReport", isAuth, ReportsController.generalReport);

reportsRoutes.get("/responseTimes", isAuth, ReportsController.responseTimes);

export default reportsRoutes;
