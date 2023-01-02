import { ChangeEvent, useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ActionMsg } from "../cmps/action-msg"
import { userService } from "../services/user.service"
import { useAppDispatch } from "../store/store.hooks"
import { setToken, setTokenFirstLoginTime, setUsername } from "../store/user/user.reducer"

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [actionMsg, setActionMsg] = useState('')
    const [actionType, setActionType] = useState('')
    const { cred, handleChange } = useForm()
    const getUser = async (ev: SyntheticEvent) => {
        ev.preventDefault()

        try {
            const token = await userService.authenticateUser(cred)
            dispatch(setUsername(cred.username))
            dispatch(setToken(token.access_token))
            dispatch(setTokenFirstLoginTime(Date.now()))
            navigate('/')
        } catch (err) {
            showActionMsg('Wrong username or password', 'failure')
        }
    }
    const showActionMsg = (txt: string, type: string) => {
        setActionMsg(txt)
        setActionType(type)
        setTimeout(() => {
            setActionMsg('')
            setActionType('')
        }, 2000)
    }
    return (
        <section className="login">
            <form onSubmit={getUser}>
                <input type="text"
                    placeholder="Username here"
                    name="username"
                    value={cred.username}
                    onChange={handleChange} />
                <input type="password"
                    placeholder="Password here"
                    name="password"
                    value={cred.password}
                    onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {actionMsg && <ActionMsg msg={actionMsg} type={actionType} />}
        </section>
    )
}

const useForm = () => {
    const [cred, setCred] = useState({ username: '', password: '' })
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setCred(prevState => {
            return { ...prevState, [ev.target.name]: ev.target.value }
        })
    }

    return { cred, handleChange }
}