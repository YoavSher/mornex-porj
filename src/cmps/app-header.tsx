import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken, setTokenFirstLoginTime, setUser, setUsername } from "../store/user/user.reducer"
import { ActionMsg } from "./action-msg"
import { ChangePassword } from "./change-password"

export const AppHeader = () => {
    const loggedInUser = useAppSelector(state => state.user.loggedInUser)
    const [changePassword, setChangePassword] = useState(false)
    const [msg, setMsg] = useState('')
    const [msgType, setMsgType] = useState('')
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(setUsername(null))
        dispatch(setToken(null))
        dispatch(setTokenFirstLoginTime(null))
        dispatch(setUser(null))
    }

    const toggleModal = () => {
        setChangePassword(prevState => !prevState)
    }

    const showActionMsg = (txt: string, type: string) => {
        setMsg(txt)
        setMsgType(type)
        setTimeout(() => {
            setMsg('')
            setMsgType('')
        }, 2000)
    }

    return (
        <>
            <section className="app-header flex justify-between align-center">
                <h1 className="logo">Mornex Proj</h1>
                {loggedInUser && <div className="user-actions flex">
                    {loggedInUser.role === 'Admin' &&
                        <button onClick={toggleModal}>Change Password</button>}
                    <button onClick={onLogout}>Logout</button>
                </div>}
                {changePassword && <ChangePassword showActionMsg={showActionMsg} toggleModal={toggleModal} />}
            </section>
            {msg && <ActionMsg msg={msg} type={msgType} />}
        </>
    )
}

