import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ActionMsg } from "../cmps/action-msg"
import { CreateUserModal } from "../cmps/create-user-modal"
import { DeleteUser } from "../cmps/delet-user"
import { Loader } from "../cmps/loader"
import { UserList } from "../cmps/user-list"
import { useRefreshToken } from "../hooks/useRefreshToken"
import { userService } from "../services/user.service"
import { useAppDispatch, useAppSelector } from "../store/store.hooks"
import { deleteUser, setToken, setTokenUpdatedTime, setUser } from "../store/user/user.reducer"

export const Home = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const users = useAppSelector(state => state.user.users)
    const token = useAppSelector(state => state.user.token)
    const loggedInUser = useAppSelector(state => state.user.loggedInUser)
    const [newUserModal, setNewUserModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currUserId, setCurrUserId] = useState<number | null>(null)
    const [actionMsg, setActionMsg] = useState('')
    const [actionType, setActionType] = useState('')

    const isAdmin = loggedInUser?.role === 'Admin'

    const { refreshToken, timeCheck } = useRefreshToken()

    const onCreateNewUser = () => {
        setNewUserModal(true)
    }
    const closeModal = () => {
        setNewUserModal(false)
        setShowDeleteModal(false)
    }

    const onDeleteUser = (userId: number) => {
        setShowDeleteModal(true)
        setCurrUserId(userId)
    }

    const confirmUserDelete = async () => {
        // console.log('currUserId:', currUserId)
        try {
            if (currUserId && token) {
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
                // setTimeout(() => { }, 700)
                await userService.deleteUser(currUserId, currToken)
                dispatch(deleteUser(currUserId))
                setShowDeleteModal(false)
                setCurrUserId(null)
                showActionMsg('User deleted', 'success')
            }
        } catch (err) {
            showActionMsg('Failed to delete user', 'failure')
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
    if (!users) return <section className="home"><Loader /></section>
    return (
        <section className="home">
            {isAdmin && <button className="create-user-btn" onClick={onCreateNewUser}>Create a new user</button>}
            <UserList users={users} deleteUser={onDeleteUser} showActionMsg={showActionMsg} />
            {newUserModal && <CreateUserModal closeModal={closeModal} showActionMsg={showActionMsg} />}
            {showDeleteModal && <DeleteUser closeModal={closeModal} confirmUserDelete={confirmUserDelete} />}
            {actionMsg && <ActionMsg msg={actionMsg} type={actionType} />}
        </section>
    )
}

