import { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import { URL } from "url";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid url parameter" });
  }

  try {
    const decodedUrl = new URL(decodeURIComponent(url));

    https
      .get(decodedUrl.href, (proxyRes) => {
        const contentType = proxyRes.headers["content-type"];

        if (!contentType || !contentType.startsWith("image")) {
          res
            .status(400)
            .json({ error: "The requested resource isn't a valid image" });
          return;
        }

        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res);
      })
      .on("error", (err) => {
        console.error("Failed to load image:", err);
        res.status(500).json({ error: "Failed to load image" });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid URL" });
  }
}
