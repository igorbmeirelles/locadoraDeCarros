import { CategoriesRepository } from "../../repositories/categories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export default () => {
  const createCategoryRepository = new CategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCase(createCategoryRepository);
  const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

  return listCategoriesController
}