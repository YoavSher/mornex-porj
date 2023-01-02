import { useState } from "react"
import { User } from "../interfaces/user"
import { useAppSelector } from "../store/store.hooks"
import { CreateUserModal } from "./create-user-modal"

interface Props {
    user: User,
    deleteUser: any,
    showActionMsg: any
}

export const UserPreview = ({ user, deleteUser, showActionMsg }: Props) => {
    const loggedInUser = useAppSelector(state => state.user.loggedInUser)
    const isAdmin = loggedInUser?.role === 'Admin'
    const isCurrUser = loggedInUser?.id === user.id
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <section className="user-preview">
            {isAdmin && !isCurrUser && <button onClick={() => deleteUser(user.id)}>x</button>}
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
            {isAdmin && <button onClick={() => setShowModal(true)}>Edit</button>}
            {showModal && isAdmin && <CreateUserModal closeModal={closeModal} user={user} showActionMsg={showActionMsg}/>}
        </section>
    )
}