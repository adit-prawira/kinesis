import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from "../../middlewares";
import { BadRequestError, DataBaseConnectionError } from "../../errors";
import { Password } from "../../service";
import { User } from "../../models";
const router = express.Router();

router.put(
    "/api/users/account/update",
    requireAuth,
    [
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("A valid working email must be provided"),
        body("username")
            .notEmpty()
            .isString()
            .withMessage("A username should not be empty"),
        body("age").notEmpty().isInt().withMessage("Age should not be empty"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const targetUserId = req.currentUser!.id;
        const newDetails = req.body;
        await User.findByIdAndUpdate(targetUserId, { ...newDetails });
        res.status(204).send({});
    }
);

router.put(
    "/api/users/password/update",
    requireAuth,
    [
        body("password")
            .trim()
            .notEmpty()
            .isLength({ min: 4, max: 20 })
            .withMessage("A password must be provided"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const targetUserId = req.currentUser!.id;
        const { password: newPassword } = req.body;
        const newHashedPassword = await Password.toHash(newPassword);
        await User.findByIdAndUpdate(targetUserId, {
            password: newHashedPassword,
        });
        res.status(204).send({});
    }
);
export { router as updateAccountRouter };
