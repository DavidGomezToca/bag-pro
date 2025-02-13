import { TranslationsProvider } from "../contexts/TranslationsContext"

const AppProviders = ({ children }) => {
  return (
    <TranslationsProvider>
      {children}
    </TranslationsProvider>
  )
}

export default AppProviders