import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/categories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/infra/repositories/categories/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/repositories/specifications/SpecificationsRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/users/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/users/UsersRepository';
import { ICarsRepository } from '../../modules/cars/repositories/cars/ICarsRepository';
import { CarsRepository } from '../../modules/cars/infra/repositories/cars/CarsRepository';
import { ICarsImagesRepository } from '../../modules/cars/repositories/cars/ICarsImagesRepository';
import { CarsImagesRepository } from '../../modules/cars/infra/repositories/cars/CarsImagesRepository';
import { IRentalsRepository } from '../../modules/rentals/repository/IRentalsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';

import "./providers";

import { IUsersTokenRepository } from '../../modules/accounts/repositories/token/IUsersTokenRepository';
import { UsersTokenRepository } from '../../modules/accounts/infra/typeorm/repositories/token/UsersTokenRepository';

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)
container.registerSingleton<ICarsImagesRepository>("CarsImagesRepository", CarsImagesRepository)
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository)
container.registerSingleton<IUsersTokenRepository>("UsersTokenRepository", UsersTokenRepository)