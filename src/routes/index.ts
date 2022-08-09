//router index file
import { Router } from 'express';
import userRouter from './userRouter';
import reminderRouter from './reminderRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/reminder', reminderRouter);

export default router;
