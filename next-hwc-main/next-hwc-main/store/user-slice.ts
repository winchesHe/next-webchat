import { createSlice } from '@reduxjs/toolkit'

export const usernameSlice = createSlice({
    name: 'username',
    initialState: {
        value: 'winches'
    },
    reducers: {
        changeName(state, username: { payload: string }) {
            state.value = username.payload
        }
    }
})

export const { changeName } = usernameSlice.actions
export default usernameSlice.reducer



