import { Suspense } from 'react';
import { CourseContent } from '@/components/course/CourseContent';
import { CourseLoading } from '@/components/course/CourseLoading';
import { RocketCursor } from '@/components/RocketCursor';

export default function CoursePage() {
  return (
    <>
      <RocketCursor />
      <Suspense fallback={<CourseLoading />}>
        <CourseContent />
      </Suspense>
    </>
  );
}
