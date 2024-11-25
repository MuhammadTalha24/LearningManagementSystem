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
        })
    })
})


export const { useCreateCourseMutation, useGetCreatorCoursesQuery } = courseApi; 