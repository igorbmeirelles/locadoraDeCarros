import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgressCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category | undefined {
    console.log(`findByName: ${name}`);
    return undefined;
  }
  list(): Category[] {
    return []
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(`create: ${name} - ${description}`);
  }

}

export { PostgressCategoriesRepository };