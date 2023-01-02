import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken } from "../store/user/user.reducer"

export const useRefreshToken = () => {
    const token = useAppSelector(state => state.user.token)
    const lastUpdate = useAppSelector(state => state.user.tokenTime?.updatedTime)
    const dispatch = useAppDispatch()

    const timeCheck = lastUpdate ? ((Date.now() - lastUpdate) / 1000 / 60) : 0

    const refreshToken = async () => {
        if (token) {
            try {
                const newToken = await userService.refreshToken(token)
                dispatch(setToken(newToken.access_token))
                console.log('refresh');
                return newToken

            } catch (err) {
                console.log('err:', err)
            }
        }
    }
    return { refreshToken, timeCheck }
}