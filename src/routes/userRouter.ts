import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('/', userController.registerUser);
router.put('/:userId/refresh-token', userController.updateUserToken);
router.delete('/:userId', userController.deleteUser);

export default router;
