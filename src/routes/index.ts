import { Router } from "express"

import { CategoriesRoutes } from './Categories.routes';
import { SpecificationsRouter } from './Specifications.routes'
import { UserRoutes } from "./Users.routes";

const router = Router()

router.use("/categories", CategoriesRoutes)
router.use("/specifications", SpecificationsRouter)
router.use("/users", UserRoutes)

export { router }