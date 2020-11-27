import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import multer from "multer";
const router = express.Router();
const cloudinary = require("cloudinary").v2;
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post("/", (req, res, next) => {
  const upload = multer({ storage }).single("image");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log(req.file.path);
    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `product/${uniqueFilename}`, tags: `product` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        // remove file from server
        fs.unlinkSync(path);
        // return image details
        res.json(image.secure_url);
      }
    );
  });
});

export default router;
