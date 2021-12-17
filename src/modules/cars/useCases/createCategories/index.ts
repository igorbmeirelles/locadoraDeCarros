import { CategoriesRepository } from "../../repositories/categories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";
import { CreateCategoryController } from "./CreateCategoriesController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default () => {
  const categoryRepository: ICategoriesRepository = new CategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  return createCategoryController
}