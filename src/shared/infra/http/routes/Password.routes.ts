import { Router } from 'express';
import { ResetPasswordUserController } from '../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const PasswordRouter = Router();

PasswordRouter.post("/forgot", new SendForgotPasswordMailController().handle);
PasswordRouter.post("/reset", new ResetPasswordUserController().handle);

export { PasswordRouter };