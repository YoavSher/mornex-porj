import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRefreshToken } from "../hooks/useRefreshToken"
import { userService } from "../services/user.service"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken, setTokenUpdatedTime } from "../store/user/user.reducer"
interface Props {
    showActionMsg: any,
    toggleModal: () => void
}
export const ChangePassword = ({ showActionMsg, toggleModal }: Props) => {
    const loggedInUser = useAppSelector(state => state.user.loggedInUser)
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { cred, handleChange } = useForm()
    const { refreshToken, timeCheck } = useRefreshToken()
    const saveUser = async (ev: SyntheticEvent) => {
        ev.preventDefault()
        if (cred.password !== cred.rePassword) {
            showActionMsg('Password doesn\'t match', 'failure')
            return
        }
        if (loggedInUser && token) {
            let currToken = token
            if (timeCheck >= 5) {
                const newToken = await refreshToken()
                currToken = newToken.access_token
                dispatch(setToken(newToken.access_token))
                dispatch(setTokenUpdatedTime(Date.now()))
            } else if (timeCheck > 60 * 24) {
                showActionMsg('Connection expired', 'failure')
                setTimeout(() => {
                    navigate('/login')
                }, 2100)
            }
            try {
                const user = {
                    ...loggedInUser,
                    password: cred.password
                }
                const newUser = await userService.updateUser(user.id, user, currToken)
                toggleModal()
                showActionMsg('Password changed', 'success')
            } catch (err) {
                showActionMsg('Couldn\'t change password', 'failure')
                // console.log('err:', err)
            }

        }
    }
    return (
        <section className="change-password">
            <button className="close-modal" onClick={toggleModal}>x</button>
            <form onSubmit={saveUser}>
                <input type="text"
                    placeholder="New password"
                    name="password"
                    value={cred.password}
                    required
                    onChange={handleChange} />
                <input type="text"
                    placeholder="Repeat password"
                    name="rePassword"
                    value={cred.rePassword}
                    required
                    onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

const useForm = () => {
    const [cred, setCred] = useState({ password: '', rePassword: '' })
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setCred(prevState => {
            return { ...prevState, [ev.target.name]: ev.target.value }
        })
    }
    return { cred, handleChange }
}