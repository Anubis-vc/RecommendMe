import { Router } from 'express';
import controller from '../controllers/dbController';
const router = Router();

router.get('/', controller.getUsers);

export default router;