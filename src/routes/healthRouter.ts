import { Router } from 'express';
import { healthController } from '../controllers';

const router = Router();

router.get('/', healthController.getHealthStatus);

export default router;
