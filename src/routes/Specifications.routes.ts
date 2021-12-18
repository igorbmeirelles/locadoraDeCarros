import { Router } from 'express';

import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated';
const SpecificationsRouter = Router();

SpecificationsRouter.post("/", EnsureAuthenticated, new CreateSpecificationsController().handle)

SpecificationsRouter.get("/", EnsureAuthenticated, new ListSpecificationsController().handle)

export { SpecificationsRouter };