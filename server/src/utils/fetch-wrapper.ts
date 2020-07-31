import { promiseHandler } from "./promise-handler";
export type MethodType = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
const fetch = require("node-fetch");

// const baseUrl = "http://localhost:3000/api";
const headers = {};

export const nodeGetFetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<[T | null, any?]> => {
  if (body.token) headers["Authorization"] = `token ${body.token}`;
  const [response, err] = await promiseHandler(
    fetch(url, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  );

  if (err) {
    return [null, err];
  }
  const res = await response.json();
  return [res, null];
};

export const nodePopstFetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<[T | null, any?]> => {
  const [response, err] = await promiseHandler(
    fetch(url, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
  );

  if (err) {
    return [null, err];
  }
  const res = await response.json();
  return [res, null];
};
