import { getRepository } from 'typeorm';

import { resolve } from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';

import Course from '../models/Course';

interface Request {
  name: string;
  image: string;
}

class CreateCoursesService {
  public async run({ name, image }: Request): Promise<Course> {
    const coursesRepository = getRepository(Course);

    const filePath = resolve(__dirname, '..', '..', 'tmp', 'uploads', image);

    const existentCourse = await coursesRepository.findOne({
      where: {
        name,
      },
    });

    if (existentCourse) {
      fs.promises.unlink(filePath);

      throw new AppError('Este curso já foi cadastrado.');
    }

    const course = coursesRepository.create({
      name,
      image,
    });

    await coursesRepository.save(course);

    if (!process.env.FILE_URL) {
      throw new AppError('Internal Server Error', 'server_error', 500);
    }

    return {
      ...course,
      image: `${process.env.FILE_URL}/${course.image}`,
    };
  }
}

export default CreateCoursesService;
