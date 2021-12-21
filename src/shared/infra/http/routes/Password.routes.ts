import { Router } from 'express';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const PasswordRouter = Router();

PasswordRouter.post("/forgot", new SendForgotPasswordMailController().handle);

export { PasswordRouter };