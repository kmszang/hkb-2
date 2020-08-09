import { Router, Request, Response, query } from "express";
import { validateBody } from "../middlewares/validate-body";
import {
	signUpWithId,
	loginController,
	githubLoginController,
	getCurrentUser,
	logout,
} from "../service/user-service";
import { ISignUpBody, ILoginBody } from "../repository/user-repository";
import passport from "../passport";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const userRouter = Router();

userRouter.get("/current-user", isAuthenticated, getCurrentUser);
userRouter.get("/log-out", logout);

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
	githubLoginController
);

export default userRouter;
