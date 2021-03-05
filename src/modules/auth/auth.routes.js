import { Router } from 'express';
import { Login, Signup } from './auth.controller';
import passport from 'passport';

const router = Router();

router.post('/login', Login);

router.post('/sign-up', Signup);

export default router;
