import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/categories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let createCategoryInMemory: CategoriesRepositoryInMemory

describe("Create category", () => {
  beforeEach(() => {
    createCategoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(createCategoryInMemory);
  })
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Test",
      description: "Test description"
    }
    await createCategory.execute(category);
    const categoryInMemory = await createCategoryInMemory.findByName(category.name)

    expect(categoryInMemory).toHaveProperty("id")
  })

  it("Should not be able to create a new category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Test",
        description: "Test description"
      }

      await createCategory.execute(category);
      await createCategory.execute(category);

      const categoryInMemory = await createCategoryInMemory.findByName(category.name)
      await createCategoryInMemory.findByName(category.name)
    
    }).rejects.toBeInstanceOf(AppError)

  })
})