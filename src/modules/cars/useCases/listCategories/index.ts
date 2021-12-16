import { CategoriesRepository } from "../../repositories/categories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const createCategoryRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(createCategoryRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController }