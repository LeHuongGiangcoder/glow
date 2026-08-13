'use client'

import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { Dictionary } from './dictionaries/en'
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from './config'

type I18nValue = {
  locale: Locale
  t: Dictionary
}

const I18nContext = createContext<I18nValue | null>(null)

/**
 * Seeded once, in the root layout, from the locale the server already resolved.
 * The dictionary crosses to the client as serialised props rather than being
 * imported there, so a client component never pulls in the locale it is not
 * rendering.
 */
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  return (
    <I18nContext.Provider value={{ locale, t: dictionary }}>
      {children}
    </I18nContext.Provider>
  )
}

function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) {
    throw new Error('useT / useLocale must be used inside <I18nProvider>')
  }
  return value
}

/** The dictionary for the current locale. */
export function useT(): Dictionary {
  return useI18n().t
}

export function useLocale(): Locale {
  return useI18n().locale
}

/**
 * Switching locale writes the cookie and asks the server to re-render. Every
 * page reads its copy on the server, so `router.refresh()` is what actually
 * swaps the language — the provider's own value arrives with the new tree.
 */
export function useSetLocale() {
  const router = useRouter()

  return useCallback(
    (next: Locale) => {
      document.cookie = [
        `${LOCALE_COOKIE}=${next}`,
        'path=/',
        `max-age=${LOCALE_COOKIE_MAX_AGE}`,
        'samesite=lax',
      ].join('; ')
      router.refresh()
    },
    [router],
  )
}

export { DEFAULT_LOCALE }
