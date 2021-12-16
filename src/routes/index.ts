import { Router } from "express"

import { CategoriesRoutes } from './Categories.routes';
import { SpecificationsRouter } from './Specifications.routes'

const router = Router()

router.use("/categories", CategoriesRoutes)
router.use("/specifications", SpecificationsRouter)

export { router }