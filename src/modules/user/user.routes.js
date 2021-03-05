import { Router } from 'express';
import { createUser } from './user.controller';
import { verifyToken } from '../../middlewares/VerifyToken';

const router = Router();

router.get('/', verifyToken, createUser);

export default router;
