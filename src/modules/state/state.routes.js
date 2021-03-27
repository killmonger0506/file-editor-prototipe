import { Router } from 'express';
import { get_states } from './state.controller';

const router = Router();

router.get('/:id',  get_states);

export default router;
