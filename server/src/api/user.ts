import {
  nodeGetFetchWrapper,
  nodePopstFetchWrapper,
} from "../utils/fetch-wrapper";

export interface IrequestAccessToken {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_url?: string;
  state?: string;
}

export interface IaccessGithubApi {
  token: string;
}

export const requestAccessToken = async (args: IrequestAccessToken) => {
  return await nodePopstFetchWrapper<undefined, IrequestAccessToken>(
    "POST",
    "https://github.com/login/oauth/access_token",
    args
  );
};

export const accessGithubApi = async (args: IaccessGithubApi) => {
  return await nodeGetFetchWrapper<undefined, IaccessGithubApi>(
    "GET",
    "https://api.github.com/user",
    args
  );
};
