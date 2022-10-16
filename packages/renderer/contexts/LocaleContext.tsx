import React, { createContext, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

type LocalContext = {
   toggleLang?: () => void
   setRawLang?: (T: string) => void
   t: (T: string) => string
   language: string
}

const initial = {
   language: 'en',
   t: () => ''
}
export const LocaleContext = createContext<LocalContext>(initial)

type props = {
   children: React.ReactNode
}
export const LocaleProvider = ({ children }: props) => {
   const { i18n } = useTranslation()

   const initiateLocale = () => {
      if (localStorage && localStorage.getItem('lang'))
         setRawLang(localStorage.getItem('lang') || 'en')
   }

   const handleDirection = (dir: string) => {
      document.documentElement.dir = dir
   }

   const setRawLang = (lang: string) => {
      const dir = lang == 'ar' ? 'rtl' : 'ltr'
      localStorage.setItem('lang', lang)
      document.documentElement.lang = lang
      handleDirection(dir)
      i18n.changeLanguage(lang)
   }
   const toggleLang = () => {
      setRawLang(i18n.language == 'en' ? 'ar' : 'en')
   }
   useEffect(() => {
      initiateLocale()
   }, [])

   return (
      <LocaleContext.Provider
         value={{ toggleLang, setRawLang, language: i18n.language, t: i18n.t }}
      >
         {children}
      </LocaleContext.Provider>
   )
}
export default () => useContext(LocaleContext)
