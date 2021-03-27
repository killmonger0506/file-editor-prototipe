import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import countryRoutes from './modules/country/country.routes';
import cityRoutes from './modules/city/city.routes';
import stateRoutes from './modules/state/state.routes';

const router = Router();

router.get('/', (req, res) => res.send('API WORKING'));

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

router.use('/country', countryRoutes);
router.use('/state', stateRoutes);
router.use('/city', cityRoutes);


export default router;
