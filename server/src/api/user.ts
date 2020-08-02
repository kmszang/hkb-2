import { nodeGetFetchWrapper } from "../utils/fetch-wrapper";

export interface IaccessGithubApi {
  token: string;
}

export const accessGithubApi = async (args: IaccessGithubApi) => {
  return await nodeGetFetchWrapper<undefined, IaccessGithubApi>(
    "GET",
    "https://api.github.com/user",
    args
  );
};
