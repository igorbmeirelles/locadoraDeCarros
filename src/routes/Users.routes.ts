import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer"
import uploadConfig from "../config/upload"
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";
const UserRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./temp/avatar"))

UserRoutes.post("/", new CreateUserController().handle);
UserRoutes.patch("/avatar", uploadAvatar.single("file"), EnsureAuthenticated,new UpdateUserAvatarController().handle);

export { UserRoutes }
