export class HttpError extends Error {
  constructor(status, code, message, details = {}) { super(message); Object.assign(this, { status, code, details }) }
}

export function errorHandler(error, _request, response, next) {
  if (response.headersSent) return next(error)
  if (error instanceof HttpError) return response.status(error.status).json({ error: { code: error.code, message: error.message, ...error.details } })
  if (error.type === 'entity.too.large') return response.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'JSON body exceeds 32 KiB.' } })
  if (error.type === 'entity.parse.failed') return response.status(400).json({ error: { code: 'INVALID_JSON', message: 'Malformed JSON body.' } })
  if (/Mongo.*(?:Network|Selection|Topology)|MongooseServerSelectionError/.test(error.name)) return response.status(503).json({ error: { code: 'DATABASE_UNAVAILABLE', message: 'Database unavailable. Retry later.' } })
  return response.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Request could not be processed.' } })
}
