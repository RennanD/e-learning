import { Request, Response } from 'express';

import ListCoursesService from '../services/ListCoursesService';
import CreateCoursesService from '../services/CreateCoursesService';
import UpdateCoursesService from '../services/UpdateCoursesService';

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

    return response.status(201).json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const image = request.file.filename;

    const { course_id } = request.params;

    const updateCourse = new UpdateCoursesService();

    const course = await updateCourse.run({
      course_id,
      name,
      image,
    });

    return response.json(course);
  }
}

export default new CoursesController();
