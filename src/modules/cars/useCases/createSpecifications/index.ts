import { SpecificationsRepository } from "../../repositories/specifications/SpecificationsRepository";
import { CreateSpecificationsController } from "./CreateSpecificationsController";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

export default() => {

  const createSpecificationsRepository = new SpecificationsRepository();
  const createSpecificationsUseCase = new CreateSpecificationsUseCase(createSpecificationsRepository)
  const createSpecificationsController = new CreateSpecificationsController(createSpecificationsUseCase)

  return createSpecificationsController
}
