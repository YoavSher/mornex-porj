interface Props {
    closeModal: () => void,
    confirmUserDelete: any
}

export const DeleteUser = ({ closeModal, confirmUserDelete }: Props) => {
    return (
        <section className="delete-user">
            <h1>Are you sure?</h1>
            <div>
                <button onClick={confirmUserDelete}>Yes</button>
                <button onClick={closeModal}>no</button>
            </div>
        </section>
    )
}