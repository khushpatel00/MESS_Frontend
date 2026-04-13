'use client'

interface params {
    UserID: String | null,
    Message: String,
}
export default function MessageBlock({ UserID = null, Message }: params) {

    return (
        <>
            <div className={'bg-zinc-200 text-zinc-900 px-5 py-2 m-2 rounded-xl'}>
                <p className={'text-zinc-700'}>{UserID?.toString()}</p>
                <p className={'text-3xl text-zinc-900'}>{Message.toString()}</p>
            </div>
        </>
    )
}