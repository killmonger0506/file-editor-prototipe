import { Router } from 'express';
import { get_cities } from './city.controller';

const router = Router();

router.get('/:id',  get_cities);

export default router;
