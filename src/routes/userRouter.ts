import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.post('/', userController.registerUser);

export default router;