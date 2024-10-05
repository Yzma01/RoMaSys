export const makeFetchWhatsapp = async (url, method, params, body) => {
    const baseUrl = process.env.BASE_URL_WHATSAPP; // "http://localhost:5000"; //!Cambiar estoooooooooooooooooooooooooooooooooooo
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