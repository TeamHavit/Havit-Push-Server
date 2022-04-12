import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.post('/', userController.registerUser);
router.put('/:userId/refresh-token', userController.updateUserToken);

export default router;