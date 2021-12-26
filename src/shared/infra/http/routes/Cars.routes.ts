import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarsController } from "../../../../modules/cars/useCases/createCars/CreateCarsController";
import { CreateCarSpecificationsController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import { EnsureAdmin } from "../middleware/EnsureAdmin";
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";

const CarsRoutes = Router();

const upload = multer(uploadConfig);

CarsRoutes.post(
  "/",
  EnsureAuthenticated,
  EnsureAdmin,
  new CreateCarsController().handle
);
CarsRoutes.get("/available", new ListAvailableCarsController().handle);
CarsRoutes.post(
  "/specifications/:id",
  EnsureAuthenticated,
  EnsureAdmin,
  new CreateCarSpecificationsController().handle
);
CarsRoutes.post(
  "/images/:id",
  EnsureAuthenticated,
  EnsureAdmin,
  upload.array("images"),
  new UploadCarImagesController().handle
);

export { CarsRoutes };
