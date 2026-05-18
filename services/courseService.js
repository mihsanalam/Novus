import { client } from '../lib/sanity';

export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const query = `*[_type == "course"] | order(_createdAt desc) {
      _id,
      title,
      description,
      image,
      videoUrl,
      category,
      level,
      type,
      duration,
      durationMinutes,
      price,
      instructor,
      "chapters": chapters[]-> {
        _id,
        title,
        duration,
        durationMinutes
      }
    }`;
    return await client.fetch(query);
  },

  // Get single course by ID
  getCourseById: async (id) => {
    const query = `*[_type == "course" && _id == $id][0] {
      _id,
      title,
      description,
      image,
      videoUrl,
      category,
      level,
      type,
      duration,
      durationMinutes,
      price,
      instructor,
      "chapters": chapters[]-> {
        _id,
        title,
        description,
        videoUrl,
        duration,
        durationMinutes,
        content
      }
    }`;
    return await client.fetch(query, { id });
  },

  // Search courses
  searchCourses: async (searchTerm) => {
    const query = `*[_type == "course" && (title match $searchTerm || description match $searchTerm)] {
      _id,
      title,
      description,
      image,
      videoUrl,
      category,
      level,
      type,
      duration,
      durationMinutes,
      price,
      instructor
    }`;
    return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
  },

  // Get courses by category
  getCoursesByCategory: async (category) => {
    const query = `*[_type == "course" && category == $category] {
      _id,
      title,
      description,
      image,
      category,
      level,
      duration,
      price,
      instructor
    }`;
    return await client.fetch(query, { category });
  },

  // Get chapter by ID
  getChapterById: async (id) => {
    const query = `*[_type == "chapter" && _id == $id][0] {
      _id,
      title,
      description,
      videoUrl,
      duration,
      order,
      content
    }`;
    return await client.fetch(query, { id });
  }
};
