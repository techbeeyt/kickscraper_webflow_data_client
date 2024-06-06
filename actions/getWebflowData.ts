"use server";

import { http, webflow } from "@/lib/axios";

export const listSites = async (token: string) => {
  const sites = await webflow.get("/v2/sites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return sites.data.sites;
};

export const getCustomDomains = async (site_id: string, token: string) => {
  try {
    const domains = await webflow.get(`/v2/sites/${site_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log(domains.data);

    return {
      domain:
        domains.data.customDomains.length > 0
          ? domains.data.customDomains[0].url
          : `${domains.data.shortName}.webflow.io`,
      shortName: domains.data.shortName,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createApp = async (domain: string, token: string) => {
  const app = await http.post(
    "/user/app/create",
    {
      name: domain,
      domain: domain,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return app.data;
};

export const setupCustomCode = async (site_id: string, token: string) => {
  try {
    const req = await webflow.post(
      `/v2/sites/${site_id}/registered_scripts/inline`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};
