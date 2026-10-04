import { Router } from 'express';

const router = Router();

import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

const router = Router();

router.get('/', ClientController.list);
router.post('/', ClientController.create);

export default router;


export default router;
Add client routes placeholder
Connect ClientController to client routes
