import { tokensAndData } from "./App";

async function fetchGraphQL(text: string, variables?: any) {
  const response = await fetch("http://0.0.0.0:4000/graphql", {
    method: "POST",
    credentials: "include",
    headers: {
      ...(tokensAndData.accessToken
        ? { Authorization: tokensAndData.accessToken }
        : {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGraphQL;
