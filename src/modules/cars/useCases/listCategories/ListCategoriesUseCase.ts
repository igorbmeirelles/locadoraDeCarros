import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";


class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list();
    return list;
  }
}

export { ListCategoriesUseCase };