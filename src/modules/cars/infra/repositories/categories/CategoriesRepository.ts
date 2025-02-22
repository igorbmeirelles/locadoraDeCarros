import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/categories/ICategoriesRepository";
import { Repository, getRepository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository()
  //   }

  //   return CategoriesRepository.INSTANCE
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description })

    await this.repository.save(category)

  }

  async findByName(name: string): Promise<Category> | undefined {
    const category = await this.repository.findOne({name})
    return category
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }
}

export { CategoriesRepository }