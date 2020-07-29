import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import { signUpWithId } from "../service/userService";
import { ISignUpBody } from "../repository/user-repository";

const userRouter = Router();

userRouter.post(
	"/sign-up",
	validateBody<ISignUpBody>(["userId", "name", "password"]),
	signUpWithId
);
// userRouter.post("/social-user", validateBody(["name", "socialId"]), createUser);

export default userRouter;
