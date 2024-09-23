export const makeFetch = async (url, method, params, body) => {
    const baseUrl = "http://localhost:3000"; //!Isma cambie esto a una variable de entorno
    const apiURL = `${baseUrl + url}${
      params !== "" ? "/" + params : ""
    }`;
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