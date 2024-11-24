import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn, userloggedOut } from '../authSlice'



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
        logoutUser: builder.mutation({
            query: () => ({
                url: 'logout',
                method: "GET",
            }),
            onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userloggedOut());
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getProfile: builder.query({
            query: () => ({
                url: "profile",
                method: 'GET',
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
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                credentials: 'include'
            })
        })

    })
})


export const { useLoginUserMutation, useRegisterUserMutation, useGetProfileQuery, useUpdateProfileMutation, useLogoutUserMutation } = authApi


