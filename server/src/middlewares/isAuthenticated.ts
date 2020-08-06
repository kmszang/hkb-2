import { AuthenticateError } from "../errors/authenticate-error";
export const isAuthenticated = (req, res, next) => {
  if (!req.user) throw new AuthenticateError();
  return next();
};
