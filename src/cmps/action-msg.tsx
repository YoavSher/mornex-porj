
interface Props {
    msg: string,
    type: string
}

export const ActionMsg = ({ msg, type }: Props) => {
    return (
        <section className={`action-msg ${type}`}>
            <h1>{msg}</h1>
        </section>
    )
}