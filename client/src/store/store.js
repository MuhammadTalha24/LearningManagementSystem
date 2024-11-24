import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducers.js';
import { authApi } from '@/features/api/authApi.js';
import { courseApi } from '../features/api/courseApi.js';



const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})


const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.getProfile.initiate({}, { forceRefetch: true }))
}

initializeApp();
export default store;

