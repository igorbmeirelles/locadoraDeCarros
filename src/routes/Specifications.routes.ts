import { Router } from 'express';

import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const SpecificationsRouter = Router();

SpecificationsRouter.post("/", new CreateSpecificationsController().handle)

SpecificationsRouter.get("/", new ListSpecificationsController().handle)

export { SpecificationsRouter };