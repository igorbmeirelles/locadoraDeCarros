import { Router } from "express";
import { CreateCarsController } from "../../../../modules/cars/useCases/createCar/CreateCarsController";
import { EnsureAdmin } from "../middleware/EnsureAdmin";
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";

const CarsRoutes = Router();

CarsRoutes.post("/", EnsureAuthenticated, EnsureAdmin, new CreateCarsController().handle);

export { CarsRoutes };