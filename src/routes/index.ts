//router index file
import { Router } from 'express';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);

export default router;