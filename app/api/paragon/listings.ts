import { NextApiRequest, NextApiResponse } from "next";
import { getParagonListings } from "../../../services/paragonService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getParagonListings(); // Fetch the Paragon API data
    res.status(200).json(data); // Send the data as JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching listings from Paragon API" });
  }
}
