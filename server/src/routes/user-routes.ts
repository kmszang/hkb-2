import { Router, Request, Response, query } from "express";
import { validateBody } from "../middlewares/validate-body";
import { signUpWithId, loginController } from "../service/user-service";
import { ISignUpBody, ILoginBody } from "../repository/user-repository";
import passport from "../passport";
import { accessGithubApi } from "../api/user";
const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateBody<ISignUpBody>(["userId", "name", "password"]),
  signUpWithId
);

userRouter.post(
  "/login",
  validateBody<ILoginBody>(["userId", "password"]),
  passport.authenticate("local"),
  loginController
);

userRouter.get("/github-login", passport.authenticate("provider"));

userRouter.get(
  "/github-login/callback",
  passport.authenticate("provider"),
  loginController
);
// userRouter.post("/social-user", validateBody(["name", "socialId"]), createUser);

export default userRouter;
