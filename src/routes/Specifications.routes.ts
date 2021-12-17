import { Router } from 'express';

import createSpecificationsController from '../modules/cars/useCases/createSpecifications';
import listSpecificationsController from '../modules/cars/useCases/listSpecifications';

const SpecificationsRouter = Router();

SpecificationsRouter.post("/", (req, res) => {
  return createSpecificationsController().handle(req, res);
})

SpecificationsRouter.get("/", (req, res) => {
  return listSpecificationsController().handle(req, res);
})

export { SpecificationsRouter };