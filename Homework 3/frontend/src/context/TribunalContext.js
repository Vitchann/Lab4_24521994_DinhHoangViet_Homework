import { createContext, useContext } from 'react'

export const TribunalContext = createContext(null)
export const useTribunal = () => useContext(TribunalContext)
