'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { VN_MARKET, type Market } from './config'

const MarketContext = createContext<Market>(VN_MARKET)

/**
 * The root layout seeds Vietnam, and a market route nests its own provider
 * around its subtree — React context resolves to the nearest one, so
 * `/malaysia` gets ringgit without every page below it threading a prop.
 *
 * Client components read this rather than a server helper because
 * `TemplateCard` is a client component and has to format the same price the
 * server rendered, or hydration disagrees.
 */
export function MarketProvider({
  market,
  children,
}: {
  market: Market
  children: ReactNode
}) {
  return (
    <MarketContext.Provider value={market}>{children}</MarketContext.Provider>
  )
}

export function useMarket(): Market {
  return useContext(MarketContext)
}
