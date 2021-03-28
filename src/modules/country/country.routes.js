import { Router } from 'express';
import { get_countries } from './country.controller';

const router = Router();

router.get('/',  get_countries);

export default router;
