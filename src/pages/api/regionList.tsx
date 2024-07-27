import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Region from "../../models/regionModels";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const regions = await Region.find({}).limit(10).exec();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
