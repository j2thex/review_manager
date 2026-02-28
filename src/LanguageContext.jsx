import { createContext, useContext, useMemo } from 'react'
import { translations, getBrowserLanguage } from './translations'

const LanguageContext = createContext({ lang: 'en', t: () => '' })

export function LanguageProvider({ children }) {
  const lang = useMemo(() => getBrowserLanguage(), [])
  const t = useMemo(() => {
    const strings = translations[lang] || translations.en
    return (key, ...args) => {
      const value = strings[key]
      return typeof value === 'function' ? value(...args) : value ?? key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, t }), [lang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx.t) {
    const strings = translations.en
    return {
      lang: 'en',
      t: (key, ...args) => {
        const value = strings[key]
        return typeof value === 'function' ? value(...args) : value ?? key
      },
    }
  }
  return ctx
}
