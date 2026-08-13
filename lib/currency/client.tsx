'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { DEFAULT_CURRENCY, type Currency } from './config'

const CurrencyContext = createContext<Currency>(DEFAULT_CURRENCY)

/**
 * Seeded once in the root layout from the currency the server already resolved,
 * so a client component like `TemplateCard` formats the same price the server
 * rendered and hydration does not disagree.
 *
 * No setter yet: during the Malaysia test the only way to change currency is to
 * arrive through a market entry route. A picker, when it earns its place, adds
 * a `useSetCurrency` here alongside `useSetLocale`.
 */
export function CurrencyProvider({
  currency,
  children,
}: {
  currency: Currency
  children: ReactNode
}) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency(): Currency {
  return useContext(CurrencyContext)
}
