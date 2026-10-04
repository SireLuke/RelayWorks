import { Router } from 'express';
import { WorkerController } from '../controllers/WorkerController';

const router = Router();

router.get('/', WorkerController.list);
router.post('/', WorkerController.create);

export default router;
Add worker routes and connect to WorkerController
