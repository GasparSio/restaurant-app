import { useEffect } from "react"


export const DebugComponent = () => {
    useEffect(() => {
        throw new Error("DebugComponent Error")
    }
    )

    return (
        <>
            <p>Este componente fallara</p>
        </>
    )
}