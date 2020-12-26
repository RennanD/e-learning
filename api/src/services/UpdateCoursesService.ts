import { getRepository } from 'typeorm';

import { resolve } from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';

import Course from '../models/Course';

interface Request {
  course_id: string;
  name: string;
  image: string;
}

class UpdateCoursesService {
  public async run({ course_id, name, image }: Request): Promise<Course> {
    const coursesRepository = getRepository(Course);

    const findedCourse = await coursesRepository.findOne(course_id);

    if (!findedCourse) {
      throw new AppError('Este curso não existe na nossa base de dados');
    }
    const filePath = resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploads',
      findedCourse.image,
    );

    fs.promises.unlink(filePath);

    findedCourse.name = name;
    findedCourse.image = image;

    await coursesRepository.save(findedCourse);

    return {
      ...findedCourse,
      image: `${process.env.FILE_URL}/${findedCourse.image}`,
    };
  }
}

export default UpdateCoursesService;
