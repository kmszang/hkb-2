import { Request, Response } from "express";
import { User, ISignUpBody } from "../repository/user-repository";

export const signUpWithId = async (req: Request, res: Response) => {
  const { userId, password, name } = req.body as ISignUpBody;

  const [insertedUser, error] = await User.createWithId({
    userId,
    name,
    password,
  });
  if (error) {
    throw new Error(error);
  }

  res.json(insertedUser);
};

export const loginController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.send("로그인을 다시 해주세요");
  }
  return res.send("welcome");
};
