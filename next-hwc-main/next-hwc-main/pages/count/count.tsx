import type { NextPage } from 'next'
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { add, minus, getAsyncInfo } from "../../store//slice";

export const Count: NextPage = () => {

  const { count } = useAppSelector((state: any) => ({ ...state.state }), shallowEqual);
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <h1>我是Apage</h1>
      <h2>我是count:{count}</h2>
      <button
        onClick={() => {
          dispatch(add());
        }}
      >
        加1
      </button>
      <button
        onClick={() => {
          dispatch(minus());
        }}
      >
        减1
      </button>
      <button
        onClick={() => {
          dispatch(getAsyncInfo());
        }}
      >
        异步加10
      </button>
    </div>
  )
}
