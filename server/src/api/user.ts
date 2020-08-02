import { nodeGetFetchWrapper } from "../utils/fetch-wrapper";

export interface IaccessGithubApi {
  token: string;
}

export interface IProfile {
  name: string;
  id: number;
}
export const accessGithubApi = async (args: IaccessGithubApi) => {
  return await nodeGetFetchWrapper<IProfile, IaccessGithubApi>(
    "GET",
    "https://api.github.com/user",
    args
  );
};
