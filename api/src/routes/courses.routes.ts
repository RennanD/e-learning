import { Router } from 'express';

import multer from 'multer';

import CoursesController from '../controllers/CoursesController';

import { ensureAdminAuthenticated } from '../middlewares/controllAppAccess';

import multerConfig from '../config/upload';

const coursesRouter = Router();

const upload = multer(multerConfig);

coursesRouter.get('/', CoursesController.list);

coursesRouter.use(ensureAdminAuthenticated);

coursesRouter.post('/', upload.single('image'), CoursesController.create);

export default coursesRouter;
