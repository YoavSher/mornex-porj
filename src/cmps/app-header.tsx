import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken, setTokenFirstLoginTime, setUser, setUsername } from "../store/user/user.reducer"

export const AppHeader = () => {
    const loggedInUser = useAppSelector(state => state.user.loggedInUser)
    const dispatch = useAppDispatch()
    const onLogout = () => {
        dispatch(setUsername(null))
        dispatch(setToken(null))
        dispatch(setTokenFirstLoginTime(null))
        dispatch(setUser(null))
    }

    return (
        <section className="app-header flex justify-between">
            <h1>Mornex Proj</h1>
            {loggedInUser && <button onClick={onLogout}>Logout</button>}
        </section>
    )
}