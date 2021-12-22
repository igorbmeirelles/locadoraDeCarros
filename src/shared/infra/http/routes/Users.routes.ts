import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
const UserRoutes = Router();

const uploadAvatar = multer(uploadConfig);

UserRoutes.post("/", new CreateUserController().handle);
UserRoutes.patch(
  "/avatar",
  uploadAvatar.single("file"),
  EnsureAuthenticated,
  new UpdateUserAvatarController().handle
);
UserRoutes.get(
  "/profile",
  EnsureAuthenticated,
  new ProfileUserController().handle
);

export { UserRoutes };
