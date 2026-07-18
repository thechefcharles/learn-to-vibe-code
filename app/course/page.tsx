import { Suspense } from 'react';
import { CourseContent } from '@/components/course/CourseContent';
import { CourseLoading } from '@/components/course/CourseLoading';

export default function CoursePage() {
  return (
    <main>
      <Suspense fallback={<CourseLoading />}>
        <CourseContent />
      </Suspense>
    </main>
  );
}
