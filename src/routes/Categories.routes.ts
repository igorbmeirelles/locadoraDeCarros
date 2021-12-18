import { Router } from "express"

import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import { CreateCategoryController } from "../modules/cars/useCases/createCategories/CreateCategoriesController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";

import multer from "multer";

const createCategoryController = new CreateCategoryController()

const upload = multer({ dest: "./temp" });

const CategoriesRoutes = Router();

CategoriesRoutes.post("/", createCategoryController.handle)

CategoriesRoutes.get("/", new ListCategoriesController().handle)

CategoriesRoutes.post("/import", upload.single("file"), new ImportCategoryController().handle)

export { CategoriesRoutes } 