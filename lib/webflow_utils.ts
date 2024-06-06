import { webflow } from "./axios";

const { WEBFLOW_CLIENT_ID, WEBFLOW_SECRET_KEY } = process.env;

export async function getAccessToken(code: string) {
  try {
    const { data } = await webflow.post("/oauth/access_token", {
      code: code,
      grant_type: "authorization_code",
      client_id: WEBFLOW_CLIENT_ID,

      client_secret: WEBFLOW_SECRET_KEY,
    });

    return data.access_token;
  } catch (error) {
    console.log(error);
    return "";
  }
}
