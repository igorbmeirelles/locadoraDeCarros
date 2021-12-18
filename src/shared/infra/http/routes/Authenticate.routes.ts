import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const AuthenticateRoutes = Router();

AuthenticateRoutes.post("/", new AuthenticateUserController().handle);

export { AuthenticateRoutes };