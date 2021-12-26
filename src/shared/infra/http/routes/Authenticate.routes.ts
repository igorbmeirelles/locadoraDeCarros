import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController';

const AuthenticateRoutes = Router();

AuthenticateRoutes.post("/sessions", new AuthenticateUserController().handle);
AuthenticateRoutes.post("/refresh-token", new RefreshTokenController().handle);

export { AuthenticateRoutes };