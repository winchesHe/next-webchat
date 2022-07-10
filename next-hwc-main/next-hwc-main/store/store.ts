import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./slice";
import userSlice from './user-slice'

export const store = configureStore({
  // 每个reducer代表一个模块的状态管理器
  reducer: {
    state: userSlice,
  },
});

// RootState作用是返回store的方法getState的类型 function
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 作用是拿到Store的dispatch方法的类型 function
export type AppDispatch = typeof store.dispatch;

