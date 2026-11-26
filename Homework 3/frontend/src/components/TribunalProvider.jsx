import { TribunalContext } from '../context/TribunalContext.js'
import { useApiResource } from '../hooks/useApiResource.js'
import { parseDataset } from '../api/client.js'

export default function TribunalProvider({ children }) {
  const resource = useApiResource('/dossiers', parseDataset)
  return <TribunalContext.Provider value={resource}>{children}</TribunalContext.Provider>
}
