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
        }),
        getLectures: builder.query({
            query: (id) => ({
                url: `${id}/lectures`,
                method: "GET",
            })
        }),
        editLecture: builder.mutation({
            query: ({ lectureTitle, isPreviewFree, videoInfo, lectureId }) => ({
                url: `lecture/${lectureId}`,
                method: "PUT",
                body: { lectureTitle, isPreviewFree, videoInfo }
            })
        }),
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `lecture/${lectureId}`,
                method: "DELETE"
            })
        })
    })
})


export const { useCreateCourseMutation, useGetCreatorCoursesQuery, useEditCourseMutation, useGetSingleCourseQuery, useCreateLectureMutation, useGetLecturesQuery, useEditLectureMutation, useRemoveLectureMutation } = courseApi; 