import { Router } from "express"

import listCategoriesController from "../modules/cars/useCases/listCategories";
import { CreateCategoryController } from "../modules/cars/useCases/createCategories/CreateCategoriesController";
import importCategoryController from "../modules/cars/useCases/importCategory";

const createCategoryController = new CreateCategoryController()
import multer from "multer";

const upload = multer({ dest: "./temp" });

const CategoriesRoutes = Router();

CategoriesRoutes.post("/", createCategoryController.handle)

CategoriesRoutes.get("/", (req, res) => {
  return listCategoriesController().handle(req, res)
})

CategoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController().handle(req, res)
})

export { CategoriesRoutes } 