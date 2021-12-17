import { Router } from "express"

import listCategoriesController from "../modules/cars/useCases/listCategories";
import createCategoryController from "../modules/cars/useCases/createCategories/";
import importCategoryController from "../modules/cars/useCases/importCategory";

import multer from "multer";

const upload = multer({ dest: "./temp" });

const CategoriesRoutes = Router();

CategoriesRoutes.post("/", (req, res) => {
  return createCategoryController().handle(req, res)
})

CategoriesRoutes.get("/", (req, res) => {
  return listCategoriesController().handle(req, res)
})

CategoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController().handle(req, res)
})

export { CategoriesRoutes } 