import { Router } from "express"

import { UserRoutes } from "./Users.routes";
import { CategoriesRoutes } from './Categories.routes';
import { AuthenticateRoutes } from "./Authenticate.routes";
import { SpecificationsRouter } from './Specifications.routes'
import { CarsRoutes } from './Cars.routes'
import { RentalsRoutes } from "./Rentals.routes";
import { PasswordRouter } from "./Password.routes";

const router = Router()

router.use("/categories", CategoriesRoutes)
router.use("/specifications", SpecificationsRouter)
router.use("/users", UserRoutes)
router.use(AuthenticateRoutes)
router.use("/cars", CarsRoutes)
router.use("/rentals", RentalsRoutes)
router.use("/password", PasswordRouter)

export { router }