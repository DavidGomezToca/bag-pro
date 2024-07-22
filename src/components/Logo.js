import { useEffect, useState } from "react";

export default function Logo() {
    const [isSmallScreen, setIsSmallScreen] = useState(GetScreenSize());
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(GetScreenSize());
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function GetScreenSize() {
        if (window.innerWidth <= 800)
            return true;
        else
            return false;
    }

    return (
        <>
            {isSmallScreen ? <h1>Bag Pro</h1> : <h1>🌴 Bag Pro 🎒</h1>}
        </>
    );
};