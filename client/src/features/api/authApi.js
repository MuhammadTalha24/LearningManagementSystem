import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../authSlice'



export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/user/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }

        }),
        userProfile: builder.query({
            query: () => ({
                url: 'profile',
                method: "GET"
            })
        })
    })
})


export const { useLoginUserMutation, useRegisterUserMutation, useUserProfileQuery } = authApi


