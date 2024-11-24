import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const courseUrl = 'http://localhost:4000/api/course';
export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: courseUrl,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "/",
                method: "POST",
                body: { courseTitle, category }
            })
        })
    })

})


export const { useCreateCourseMutation } = courseApi