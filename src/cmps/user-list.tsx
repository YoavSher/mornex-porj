import { User } from "../interfaces/user"
import { UserPreview } from "./user-preview"

interface Props {
    users: User[] | null,
    deleteUser: any,
    showActionMsg: any
}

export const UserList = ({ users, deleteUser, showActionMsg }: Props) => {
    if (!users) return <h1>Loading...</h1>
    return (
        <section className="user-list">
            {users.map(u => {
                return <UserPreview key={u.id} user={u} deleteUser={deleteUser} showActionMsg={showActionMsg} />
            })}
        </section>
    )
}