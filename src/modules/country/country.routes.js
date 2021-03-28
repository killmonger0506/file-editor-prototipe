import { Router } from 'express';
import { get_countrys } from './country.controller';

const router = Router();

router.get('/',  get_countrys);

export default router;