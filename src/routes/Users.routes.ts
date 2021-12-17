import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const UserRoutes = Router();

UserRoutes.post("/", new CreateUserController().handle);

export { UserRoutes }
