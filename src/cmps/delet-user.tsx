interface Props {
    closeModal: () => void,
    confirmUserDelete: any
}

export const DeleteUser = ({ closeModal, confirmUserDelete }: Props) => {
    return (
        <section className="delete-user">
            <h1>Are you sure?</h1>
            <div className="delete-user-btns">
                <button className="yes-btn" onClick={confirmUserDelete}>Yes</button>
                <button className="no-btn" onClick={closeModal}>No</button>
            </div>
        </section>
    )
}