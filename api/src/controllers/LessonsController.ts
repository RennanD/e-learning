import { Request, Response } from 'express';
import CreateLessonsService from '../services/CreateLessonsService';

class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createLesson = new CreateLessonsService();

    const { name, course_id, duration, description, video_id } = request.body;

    const lesson = await createLesson.run({
      name,
      course_id,
      description,
      duration,
      video_id,
    });

    return response.json(lesson);
  }
}

export default new LessonsController();
