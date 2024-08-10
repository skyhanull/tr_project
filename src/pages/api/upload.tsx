// import { IncomingMessage } from "http";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { createWriteStream, promises as fsPromises } from "fs";
// import { join } from "path";
// import { promisify } from "util";
// import { pipeline } from "stream";

// const streamPipeline = promisify(pipeline);

// // Next.js의 기본 JSON 파서가 요청 본문을 자동으로 파싱하지 않도록
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const parseFormData = (
//   req: IncomingMessage
// ): Promise<{ fileName: string; fileData: Buffer[] }> => {
//   return new Promise((resolve, reject) => {
//     const boundary = /boundary=(.+)/.exec(
//       req.headers["content-type"] || ""
//     )?.[1];
//     if (!boundary) {
//       return reject(new Error("Boundary not found"));
//     }

//     let fileName: string | undefined;
//     let fileStream: any;
//     let fileData: Buffer[] = [];
//     let isFile = false;
//     let isFilePart = false;

//     req.on("data", (chunk) => {
//       if (chunk.includes(`--${boundary}--`)) {
//         // End of form data
//         if (fileStream) {
//           fileStream.end();
//         }
//         resolve({ fileName: fileName || "", fileData });
//       } else {
//         const data = chunk.toString();
//         if (
//           data.includes(
//             `Content-Disposition: form-data; name="file"; filename="`
//           )
//         ) {
//           const contentDisposition = /filename="(.+)"/.exec(data);
//           if (contentDisposition) {
//             fileName = contentDisposition[1];
//             fileStream = createWriteStream(
//               join(process.cwd(), "public/uploads", fileName)
//             );
//             isFile = true;
//           }
//         } else if (isFile) {
//           if (isFilePart) {
//             fileData.push(chunk);
//           }
//           isFilePart = true;
//         } else {
//           const dispositionMatch = /name="(.+?)"/.exec(data);
//           if (dispositionMatch) {
//             // Handle non-file form data here if necessary
//           }
//         }
//       }
//     });

//     req.on("end", () => {
//       if (fileStream) {
//         fileStream.end();
//       }
//       if (!fileName) {
//         reject(new Error("File name not found"));
//       }
//     });

//     req.on("error", (err) => {
//       reject(err);
//     });
//   });
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // Parse form data
//     const { fileName, fileData } = await parseFormData(req);

//     // Check if file name and data are available
//     if (!fileName || !fileData.length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "File upload failed" });
//     }

//     // Determine file path and URL
//     const filePath = join(process.cwd(), "public/uploads", fileName);
//     const fileUrl = `/uploads/${fileName}`;

//     // Save the file to disk
//     await fsPromises.writeFile(filePath, Buffer.concat(fileData));

//     // Return the file URL
//     res.status(201).json({ success: true, url: fileUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// export default handler;
