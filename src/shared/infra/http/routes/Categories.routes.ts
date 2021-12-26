import { Router } from "express"

import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategories/CreateCategoriesController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";

import multer from "multer";
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";
import { EnsureAdmin } from "../middleware/EnsureAdmin";

const createCategoryController = new CreateCategoryController()

const upload = multer({ dest: "./temp" });

const CategoriesRoutes = Router();

CategoriesRoutes.post("/", EnsureAuthenticated, EnsureAdmin, createCategoryController.handle)

CategoriesRoutes.get("/", EnsureAuthenticated, EnsureAdmin, new ListCategoriesController().handle)

CategoriesRoutes.post("/import", EnsureAuthenticated, EnsureAdmin, upload.single("file"), new ImportCategoryController().handle)

export { CategoriesRoutes } 