import { Router } from 'express';
import LessonsController from '../controllers/LessonsController';

import { ensureAdminAuthenticated } from '../middlewares/controllAppAccess';

const lessonsRouter = Router();

lessonsRouter.use(ensureAdminAuthenticated);

lessonsRouter.post('/', LessonsController.create);

export default lessonsRouter;
