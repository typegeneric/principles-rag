import type { AutoragApiResponse } from "@server/src/types/autorag-response.type";
import axios from "axios";

export class AutoRagService {
  AUTORAG_API_URL;
  AUTORAG_API_TOKEN;

  constructor(apiUrl?: string, apiToken?: string) {
    if (!(apiUrl && apiToken)) {
      throw new Error("Missing API URL or API token");
    }

    this.AUTORAG_API_URL = apiUrl;
    this.AUTORAG_API_TOKEN = apiToken;
  }

  async aiSearch(query: string) {
    try {
      const { data } = await axios.post<AutoragApiResponse>(
        this.AUTORAG_API_URL,
        {
          query,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.AUTORAG_API_TOKEN}`,
          },
        }
      );

      if (!data.success) {
        console.error(data);
        throw new Error(
          "An unknown error occurred while fetching data from AutoRag"
        );
      }

      return data.result.response;
    } catch (error) {
      console.error(error);
      return "An error occured while asking your question. Please try again later.";
    }
  }
}
