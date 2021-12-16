import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";


class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute() {
    const list = this.categoriesRepository.list();
    return list;
  }
}

export { ListCategoriesUseCase };