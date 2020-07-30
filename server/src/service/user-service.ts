import { Request, Response } from "express";
import { User, ISignUpBody } from "../repository/user-repository";
import encrypt from "../utils/encryption";
export const signUpWithId = async (req: Request, res: Response) => {
  const { userId, password, name } = req.body as ISignUpBody;
  const encryptedPassword = encrypt(password);
  const [insertedUser, error] = await User.createWithId({
    userId,
    name,
    password: encryptedPassword,
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
