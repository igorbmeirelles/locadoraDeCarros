import { Router } from "express";
import { CreateCarsController } from "../../../../modules/cars/useCases/createCar/CreateCarsController";

const CarsRoutes = Router();

CarsRoutes.post("/", new CreateCarsController().handle);

export { CarsRoutes };