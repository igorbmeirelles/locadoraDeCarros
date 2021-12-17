import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/categories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/categories/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications/SpecificationsRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/users/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/users/UsersRepository';

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)