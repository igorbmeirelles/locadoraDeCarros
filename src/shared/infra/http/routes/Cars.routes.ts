import { Router } from "express";
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/CreateCarsController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { EnsureAdmin } from "../middleware/EnsureAdmin";
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";

const CarsRoutes = Router();

CarsRoutes.post("/", EnsureAuthenticated, EnsureAdmin, new CreateCarsController().handle);
CarsRoutes.get("/available", new ListAvailableCarsController().handle);

export { CarsRoutes };