export const makeFetch = async (url, method, params, body) => {
    const baseUrl = "http://localhost:3000";
    const apiURL = `${baseUrl + url}${
      params !== undefined || null ? "/" + params : ""
    }`;
    const response = await fetch(url, {
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