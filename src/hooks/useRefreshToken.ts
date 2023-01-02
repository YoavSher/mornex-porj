import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken } from "../store/user/user.reducer"

export const useRefreshToken = () => {
    const token = useAppSelector(state => state.user.token)
    const lastUpdate = useAppSelector(state => state.user.tokenTime?.updatedTime)
    const dispatch = useAppDispatch()
    // const [newToken, setNewToken] = useState<{ access_token: string } | null>(null)
    // const timePeriod = 1000 * 60 * 5
    const timeCheck = lastUpdate ? ((Date.now() - lastUpdate) / 1000 / 60) : 0

    useEffect(() => {
        // setTimeout(() => {
        //   refreshToken()
        // }, timePeriod)
    }, [token])
    const refreshToken = async () => {
        if (token) {
            try {
                const newToken = await userService.refreshToken(token)
                // setNewToken(newToken)
                dispatch(setToken(newToken.access_token))
                console.log('refreshing');
                return newToken

            } catch (err) {
                console.log('err:', err)
            }
        }
    }
    return { refreshToken, timeCheck }
}