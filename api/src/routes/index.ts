import { Router } from 'express';

import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import coursesRouter from './courses.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/courses', coursesRouter);

export default router;
