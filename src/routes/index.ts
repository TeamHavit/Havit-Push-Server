//router index file
import { Router } from 'express';
import userRouter from './userRouter';
import reminderRouter from './reminderRouter';
import healthRouter from './healthRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/reminder', reminderRouter);
router.use('/health', healthRouter);

export default router;
