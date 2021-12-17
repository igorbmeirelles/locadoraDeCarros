import { CategoriesRepository } from '../../repositories/categories/CategoriesRepository';
import { ICategoriesRepository } from '../../repositories/categories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  
  async execute({ name, description }: IRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase }