import { createContext, useState } from "react"
import TranslationsData from "../data/translationsData.json"

export const TranslationsContext = createContext()

export function TranslationsProvider({ children }) {
    const [language, setLanguage] = useState("EN")
    const translations = TranslationsData[language]

    function handleChangeLanguage() {
        setLanguage((prevLanguage) => {
            switch (prevLanguage) {
                case "ES":
                    return "FR"
                case "FR":
                    return "EN"
                case "EN":
                    return "PT"
                case "PT":
                    return "ES"
                default:
                    return "EN"
            }
        })
    }

    return (
        <TranslationsContext.Provider value={{ language, translations, changeLanguage: handleChangeLanguage }}>
            {children}
        </TranslationsContext.Provider>
    )
}