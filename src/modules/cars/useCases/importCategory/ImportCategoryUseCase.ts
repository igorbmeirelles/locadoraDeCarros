import fs from 'fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/categories/ICategoriesRepository'

interface IImportCategories {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  private categoryRepository: ICategoriesRepository
  constructor(categoryRepository: ICategoriesRepository) {
    this.categoryRepository = categoryRepository
  }

  loadCategories(file: any): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const { path } = file

      const stream = fs.createReadStream(path)

      const categories: IImportCategories[] = []

      const parseFile = parse()

      stream.pipe(parseFile)

      parseFile.on('data', async (line: string[]) => {
        const [name, description] = line
        const category = { name, description }
        categories.push(category)
      })
        .on("end", () => {
          resolve(categories)
        })
        .on("error", err => reject(err))
    })

  }
  async execute(file: any): Promise<void> {
    if (file) {
      const categories = await this.loadCategories(file)
      categories.forEach(category => {
        const alreadyExists = this.categoryRepository.findByName(category.name)

        if (!alreadyExists) {
          this.categoryRepository.create(category)
        }
      })
    }
  }
}

export { ImportCategoryUseCase };