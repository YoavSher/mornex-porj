import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRefreshToken } from "../hooks/useRefreshToken"
import { User } from "../interfaces/user"
import { userService } from "../services/user.service"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { setToken, updateUsers, setTokenUpdatedTime, updateUser } from "../store/user/user.reducer"

interface Props {
    closeModal: () => void,
    user?: User,
    showActionMsg: any
}


export const CreateUserModal = ({ closeModal, user, showActionMsg }: Props) => {
    const token = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { cred, handleChange } = useForm(user?.username, undefined, user?.email, user?.role)
    const { refreshToken, timeCheck } = useRefreshToken()
    const saveUser = async (ev: SyntheticEvent) => {
        ev.preventDefault()
        if (cred.role === 'User' || cred.role === 'Admin') {
            console.log('token:', token)
            try {
                if (token) {
                    let newUser
                    if (timeCheck >= 5) {
                        const newToken = await refreshToken()
                        dispatch(setToken(newToken.access_token))
                        dispatch(setTokenUpdatedTime(Date.now()))
                    } else if (timeCheck > 60 * 24) {
                        navigate('/login')
                    }

                    if (user) {
                        newUser = await userService.updateUser(user.id, cred, token)
                        dispatch(updateUser(newUser))
                        showActionMsg('User updated', 'success')
                    } else {
                        newUser = await userService.createUser(cred, token)
                        dispatch(updateUsers(newUser))
                        showActionMsg('User created', 'success')
                    }

                }
            } catch (err) {
                console.log('err:', err)
                showActionMsg('Failed to update user', 'failure')
            }
            closeModal()
        } else return
    }

    return (
        <section className="create-user-modal">
            <button className="close-modal" onClick={closeModal}>x</button>
            <form onSubmit={saveUser}>
                <input type="text"
                    placeholder="Username here"
                    name="username"
                    value={cred.username}
                    required
                    onChange={handleChange} />
                <input type="password"
                    placeholder="Password here"
                    name="password"
                    value={cred.password}
                    required
                    onChange={handleChange} />
                <input type="email"
                    placeholder="Email here"
                    name="email"
                    value={cred.email}
                    required
                    onChange={handleChange} />
                <input type="text"
                    placeholder="Role here"
                    name="role"
                    value={cred.role}
                    required
                    onChange={handleChange} />
                <button type="submit">Submit</button></form>
        </section>
    )
}

const useForm = (username = '', password = '', email = '', role = 'User') => {
    const [cred, setCred] = useState({ username, password, email, role })
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setCred(prevState => {
            return { ...prevState, [ev.target.name]: ev.target.value }
        })
    }
    return { cred, handleChange }
}