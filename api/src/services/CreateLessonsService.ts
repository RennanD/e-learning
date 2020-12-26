import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Lesson from '../models/Lesson';
import Course from '../models/Course';

interface Request {
  name: string;
  course_id: string;
  duration: number;
  description: string;
  video_id: string;
}

class CreateLessonsService {
  public async run({
    name,
    course_id,
    duration,
    description,
    video_id,
  }: Request): Promise<Lesson> {
    const lessonsRepository = getRepository(Lesson);
    const coursesRepository = getRepository(Course);

    const existentLesson = await lessonsRepository.findOne({
      where: { video_id, course_id },
    });

    const coursesExists = await coursesRepository.findOne(course_id);

    if (!coursesExists) {
      throw new AppError('Este curso não existe!');
    }

    if (existentLesson) {
      throw new AppError('Está aula já existe neste curso.');
    }

    const lesson = lessonsRepository.create({
      course_id,
      name,
      duration,
      description,
      video_id,
    });

    await lessonsRepository.save(lesson);

    return lesson;
  }
}

export default CreateLessonsService;
