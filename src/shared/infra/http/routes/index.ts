import { Router } from "express"

import { UserRoutes } from "./Users.routes";
import { CategoriesRoutes } from './Categories.routes';
import { AuthenticateRoutes } from "./Authenticate.routes";
import { SpecificationsRouter } from './Specifications.routes'

const router = Router()

router.use("/categories", CategoriesRoutes)
router.use("/specifications", SpecificationsRouter)
router.use("/users", UserRoutes)
router.use("/sessions", AuthenticateRoutes)

export { router }