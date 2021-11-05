import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares";
const router = express.Router();

router.delete(
    "/api/account/delete",
    requireAuth,
    (req: Request, res: Response) => {}
);

export { router as deleteAccountRouter };
