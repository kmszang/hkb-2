import { Request, Response } from "express";
import { User, ISignUpBody } from "../repository/user-repository";
import encrypt from "../utils/encryption";
import { AuthenticateError } from "../errors/authenticate-error";
declare global {
	namespace Express {
		interface Request {
			user: any;
			logout: any;
			session: any;
		}
	}
}

export const logout = async (req: Request, res: Response) => {
	req.logout();
	req.session.save(function () {
		res.redirect("/");
	});
};

export const getCurrentUser = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.json({ id: -1 });
	}
	res.json({ id: req.user.id });
};

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

export const loginController = (req: Request, res: Response) => {
	if (!req.user) {
		throw new AuthenticateError();
	}
	return res.status(200).json({ status: 200 });
};

export const githubLoginController = (req: Request, res: Response) => {
	// const clientUrl = "http://52.78.221.38:3000";
	res.redirect("/");
};
