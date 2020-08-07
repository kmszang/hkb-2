import { Request, Response } from "express";
import { User, ISignUpBody } from "../repository/user-repository";
import encrypt from "../utils/encryption";
import { AuthenticateError } from "../errors/authenticate-error";
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

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
  //   console.log(req.session.cookie);
  if (!req.user) {
    throw new AuthenticateError();
  }
  return res.status(200).json({ status: 200 });
};
