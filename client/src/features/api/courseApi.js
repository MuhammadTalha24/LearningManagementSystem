import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Courses'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/course",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "/",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['Courses']
        }),
        getCreatorCourses: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            }),
            providesTags: ['Courses']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ['Courses']
        }),
        getSingleCourse: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            })
        }),
        createLecture: builder.mutation({
            query: ({ lectureTitle, id }) => ({
                url: `${id}/lecture`,
                method: "POST",
                body: { lectureTitle }
            })
        })
    })
})


export const { useCreateCourseMutation, useGetCreatorCoursesQuery, useEditCourseMutation, useGetSingleCourseQuery, useCreateLectureMutation } = courseApi; 