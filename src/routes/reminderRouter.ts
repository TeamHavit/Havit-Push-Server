import { Router } from "express";
import { reminderController } from "../controllers";

const router = Router();

router.post('/', reminderController.createReminder);

export default router;