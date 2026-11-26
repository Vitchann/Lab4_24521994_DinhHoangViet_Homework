import { createContext, useContext } from 'react'

export const FormContext = createContext(null)

export function useForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('Form components require SimpleForm.')
  return context
}
