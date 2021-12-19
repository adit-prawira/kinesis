import express, { Request, Response } from "express";
import fs from "fs";
import util from "util";
import { requireAuth } from "../../middlewares";
import { uploadImage, getImage } from "../../service";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

router.get(
    "/api/users/account/profile-picture/:key",
    (req: Request, res: Response) => {
        const key = req.params.key;
        const readStream = getImage(key);
        readStream.pipe(res);
    }
);

router.post(
    "/api/users/account/profile-picture",
    upload.single("image"),
    async (req: Request, res: Response) => {
        const file = req.file;
        const result = await uploadImage(file);
        await unlinkFile(file!.path);
        res.status(201).send({
            imagePath: `/api/users/profile-picture/${result.Key}`,
        });
    }
);

export { router as accountProfilePictureRouter };
