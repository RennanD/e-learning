import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { v4 } from 'uuid';

import Course from './Course';

@Entity('lessons')
class Lesson {
  constructor() {
    this.id = v4();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  course_id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  video_id: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course?: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Lesson;
