import { Router } from 'express';
import sessionsRouter from './sessions.routes';

import usersRouter from './user.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export default router;
