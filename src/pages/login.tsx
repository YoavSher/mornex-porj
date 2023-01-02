import { ChangeEvent, useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { useAppDispatch } from "../store/store.hooks"
import { setToken, setTokenFirstLoginTime, setUsername } from "../store/user/user.reducer"

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { cred, handleChange, reset } = useForm()
    const getUser = async (ev: SyntheticEvent) => {
        ev.preventDefault()

        try {
            const token = await userService.authenticateUser(cred)
            dispatch(setUsername(cred.username))
            dispatch(setToken(token.access_token))
            dispatch(setTokenFirstLoginTime(Date.now()))
            navigate('/')
            // console.log('token:', token)
        } catch (err) {
            console.log('err: ', err);

        }
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
                <button type="submit">Submit</button>
            </form>
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
    const reset = () => {
        setCred({ username: '', password: '' })
    }
    return { cred, handleChange, reset }
}