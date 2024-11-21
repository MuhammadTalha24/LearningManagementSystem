import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducers.js';
import { authApi } from '@/features/api/authApi.js';


const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})


export default store;