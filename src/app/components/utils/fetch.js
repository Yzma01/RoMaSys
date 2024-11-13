
export const makeFetch = async (url, method, params, body) => {
    const baseUrl = process.env.BASE_URL; // || "http://localhost:3000";
    const apiURL = `${baseUrl + url}${
      params !== "" || params === undefined? "/" + params : ""
    }`;
    console.log(apiURL)
  const response = await fetch(apiURL, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "default",
  });
  return response;
};