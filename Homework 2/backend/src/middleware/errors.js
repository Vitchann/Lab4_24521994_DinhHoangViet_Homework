const errors = {
  400: { code: 'INVALID_JSON', message: 'Request body must be valid JSON' },
  413: { code: 'BODY_TOO_LARGE', message: 'Request body exceeds 16kb' },
  415: { code: 'UNSUPPORTED_BODY', message: 'Unsupported request body encoding' },
  500: { code: 'INTERNAL_ERROR', message: 'Unexpected server error' },
}

export function handleError(error, _request, response, next) {
  if (response.headersSent) return next(error)
  const status = [400, 413, 415].includes(error.status) ? error.status : 500
  return response.status(status).json({ error: errors[status] })
}
