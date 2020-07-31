import { Router, Request, Response, query } from "express";
import { validateBody } from "../middlewares/validate-body";
import { signUpWithId, loginController } from "../service/user-service";
import { ISignUpBody, ILoginBody } from "../repository/user-repository";
import passport from "../passport";
import { requestAccessToken, accessGithubApi } from "../api/user";
import { request } from "http";
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
// userRouter.post("/social-user", validateBody(["name", "socialId"]), createUser);

export default userRouter;
