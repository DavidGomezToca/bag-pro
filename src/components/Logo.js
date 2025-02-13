import { useEffect, useState } from "react"

/**
 * @component Logo.
 * @returns {JSX.Element} - The Logo component.
 */
export default function Logo() {
    /**
     * Checks if the screen is small.
     * @type {boolean, function}.
     */
    const [isSmallScreen, setIsSmallScreen] = useState(GetScreenSize())

    /**
     * @effect Resize event listener.
     */
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(GetScreenSize())
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    function GetScreenSize() {
        if (window.innerWidth <= 800)
            return true
        else
            return false
    }

    return (
        <>
            {isSmallScreen ? <h1>Bag Pro</h1> : <h1>🌴 Bag Pro 🎒</h1>}
        </>
    )
}