import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import express from 'express';

const upload = multer({ dest: "public/uploads/" });
const app = express();
app.use(express.json());
export default async function handler(req, res) {
  const postsFolder = join(process.cwd(), `/_photos/`);

  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      console.log("entering post");
      try {
        await new Promise((resolve, reject) => {
          upload.single("image")(req, res, (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              // Access file information here
              console.log("req.body:", req.body);

              const { date, title, tagline, preview } = req.body;
              const image = req.file;
              console.log("date:", date);
              console.log("title:", title);
              console.log("preview:", preview);
              console.log("tagline:", tagline);
              console.log("image:", image);

              const postsfolder = join(process.cwd(), `/_photos/${uuidv4()}.md`);
              fs.writeFileSync(postsfolder, req.body, (err) => console.error(err));
              res.status(200).json({ status: 'CREATED' });
              resolve();
            }
          });
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else if (req.method === "DELETE") {
      const deleteFile = join(postsFolder, `${req.body.slug}.md`);
      fs.unlinkSync(deleteFile);
      res.status(200).json({ status: "DONE" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } else {
    res.status(200).json({ name: "This route works in development mode only" });
  }
}

// export default function handler(req, res) {
//   const postsfolder = join(process.cwd(), `/_photos/${uuidv4()}.md`);
//   if (process.env.NODE_ENV === "development") {
//     if (req.method === "POST") {
//       const data = req.body;
//       fs.writeFileSync(postsfolder, data, (err) => console.error(err));
//       res.status(200).json({ status: "CREATED" });
//     }
//     if (req.method === "DELETE") {
//       const deleteFile = join(process.cwd(), `/_photos/${req.body.slug}.md`);
//       fs.unlinkSync(deleteFile);
//       res.status(200).json({ status: "DONE" });
//     }
//   } else {
//     res.status(200).json({ name: "This route works in development mode only" });
//   }
// }
