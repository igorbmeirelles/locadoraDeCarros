import { Router } from 'express';
import { EnsureAdmin } from '../middleware/EnsureAdmin';
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated';
import { CreateCarRentalsController } from "./../../../../modules/rentals/useCases/createCarRentals/CreateCarRentalsController"
const RentalsRoutes = Router();

RentalsRoutes.post("/", EnsureAuthenticated, new CreateCarRentalsController().handle);

export { RentalsRoutes };