import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/entities/Category";
import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(@inject("CategoriesRepository") categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list();
    return list;
  }
}

export { ListCategoriesUseCase };