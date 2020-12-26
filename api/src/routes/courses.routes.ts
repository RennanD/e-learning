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
coursesRouter.put(
  '/:course_id',
  upload.single('image'),
  CoursesController.update,
);

export default coursesRouter;
