import { CategoriesRepository } from "../../repositories/categories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";
import { CreateCategoryController } from "./CreateCategoriesController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository: ICategoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController }