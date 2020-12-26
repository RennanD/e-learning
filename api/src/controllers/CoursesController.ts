import { Request, Response } from 'express';
import CreateCoursesService from '../services/CreateCoursesService';

class CoursesController {
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
