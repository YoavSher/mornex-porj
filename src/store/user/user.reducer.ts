import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { User } from '../../interfaces/user'

interface UserState {
    users: User[] | null
    username: string | null,
    loggedInUser: User | null,
    token: string | null,
    tokenTime: {
        firstLogin: number | null,
        updatedTime: number | null
    }

}

const initialState: UserState = {
    users: null,
    username: null,
    loggedInUser: null,
    token: null,
    tokenTime: {
        firstLogin: null,
        updatedTime: null
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[] | null>) => {
            state.users = action.payload
        },
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.loggedInUser = action.payload
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
        setTokenFirstLoginTime: (state, action: PayloadAction<number | null>) => {
            state.tokenTime = {
                firstLogin: action.payload,
                updatedTime: action.payload
            }
        },
        setTokenUpdatedTime: (state, action: PayloadAction<number>) => {
            if (state.tokenTime)
                state.tokenTime = {
                    firstLogin: state.tokenTime?.firstLogin,
                    updatedTime: action.payload
                }
        },
        updateUsers: (state, action: PayloadAction<User>) => {
            // state.users?.push(action.payload)
            if (state.users) {
                // console.log('action.payload.id:', action.payload.id)
                state.users.push(action.payload)
            }
        },
        updateUser: (state, action: PayloadAction<User>) => {
            // state.users?.push(action.payload)
            if (state.users) {
                // console.log('action.payload.id:', action.payload.id)
                state.users = state.users?.map(u => u.id === action.payload.id ? action.payload : u)
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {

            if (state.users) {
                state.users = state.users.filter(u => u.id !== action.payload)
            }
        }
    },
})
export const {
    setUsers,
    setUsername,
    setUser,
    setToken,
    setTokenFirstLoginTime,
    setTokenUpdatedTime,
    updateUser,
    updateUsers,
    deleteUser
} = userSlice.actions


export default userSlice.reducer