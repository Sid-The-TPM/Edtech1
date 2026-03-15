import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ForeignKey } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subject } from './subject.entity';
import { Enrollment } from './enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  thumbnailUrl: string;

  @ForeignKey(() => User)
  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'int', default: 0 })
  totalStudents: number;

  @Column({ type: 'numeric', precision: 3, scale: 2, nullable: true })
  avgRating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.createdCourses)
  creator: User;

  @OneToMany(() => Subject, (subject) => subject.course, { cascade: true })
  subjects: Subject[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
