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

userRouter.get("/github-login", async (req, res) => {
  const baseUrl = "http://localhost:3000";
  const queryObject = new URL(baseUrl + req.originalUrl).searchParams;
  console.log(queryObject);
  const code = queryObject.get("code");
  console.log(code);
  const clientId = "b11e2ef0ed1a313772ad";
  const clientSecret = "2cda7b2a0fb9de981c9923388e76b188cbcd55c3";

  const accessTokenUrl = "https://github.com/login/oauth/access_token";
  const requestBody = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_url: "http://localhost:9000",
  };
  const [response, err] = await requestAccessToken(requestBody);
  if (err) {
    console.log(err);
  }
  const accessToken = response.access_token;

  const [result, error] = await accessGithubApi({ token: accessToken });
  if (error) {
    console.log(error);
  }
  console.log(result);
  res.redirect("http://localhost:9000");
});

// userRouter.post("/social-user", validateBody(["name", "socialId"]), createUser);

export default userRouter;
