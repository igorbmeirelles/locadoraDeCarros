import { Router } from 'express';
import { ReturnRentalController } from '../../../../modules/rentals/useCases/returnRental/ReturnRentalController';
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated';
import { CreateCarRentalsController } from "./../../../../modules/rentals/useCases/createCarRentals/CreateCarRentalsController"
const RentalsRoutes = Router();

RentalsRoutes.post("/", EnsureAuthenticated, new CreateCarRentalsController().handle);
RentalsRoutes.post("/return/:id", EnsureAuthenticated, new ReturnRentalController().handle);

export { RentalsRoutes };