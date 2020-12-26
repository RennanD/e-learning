import { Request, Response } from 'express';

import ListCoursesService from '../services/ListCoursesService';
import CreateCoursesService from '../services/CreateCoursesService';

class CoursesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCourses = new ListCoursesService();

    const courses = await listCourses.run();

    return response.json(courses);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCourse = new CreateCoursesService();

    const { name } = request.body;
    const image = request.file.filename;

    const course = await createCourse.run({
      name,
      image,
    });

    return response.json(course);
  }
}

export default new CoursesController();
