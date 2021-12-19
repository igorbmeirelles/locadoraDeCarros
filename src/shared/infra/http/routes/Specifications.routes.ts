import { Router } from 'express';

import { CreateSpecificationsController } from '../../../../modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ListSpecificationsController } from '../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { EnsureAdmin } from '../middleware/EnsureAdmin';
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated';
const SpecificationsRouter = Router();

SpecificationsRouter.post("/", EnsureAuthenticated, EnsureAdmin, new CreateSpecificationsController().handle)

SpecificationsRouter.get("/", EnsureAuthenticated, EnsureAdmin,new ListSpecificationsController().handle)

export { SpecificationsRouter };