import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/userslice";
import todoReducer from "../slices/todoSlice";
import postReducer from "../slices/postSlice";
import albumReducer from "../slices/albumSlice"
import commentReducer from "../slices/commentSlice";
import photoReducer from "../slices/photoSlice";
export const store =configureStore({
    reducer:{
        users:userReducer,
        todos:todoReducer,
        posts:postReducer,
        albums:albumReducer,
        comments: commentReducer,
        photos: photoReducer,
    }
})
export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;