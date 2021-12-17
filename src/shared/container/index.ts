import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/categories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/categories/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)