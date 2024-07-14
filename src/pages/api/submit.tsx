// pages/api/hello.js

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello, Next.js 14 API!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
