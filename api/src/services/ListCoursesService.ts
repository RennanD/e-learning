import { getRepository } from 'typeorm';

import Course from '../models/Course';

class ListCoursesService {
  public async run(): Promise<Course[]> {
    const coursesReposotory = getRepository(Course);

    const courses = await coursesReposotory.find();

    return courses.map(course => ({
      ...course,
      image: `${process.env.FILE_URL}/${course.image}`,
    }));
  }
}

export default ListCoursesService;
