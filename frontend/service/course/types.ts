// types.ts
export type Course = {
  id: number; // ✅ number
  title: string;
  description: string;
  photo_url?: string;
  date_creation?: string;
};

export type CoursePayload = {
  title: string;
  description: string;
  photo_url?: string;
  date_creation?: string;
};

export type UpdateCourseInput = {
  id: number; // ✅ number
  data: CoursePayload;
};
