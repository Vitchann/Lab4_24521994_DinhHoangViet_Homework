import { Router } from 'express'
import { createTribunalController } from '../controllers/tribunal.js'
import { HttpError } from '../middleware/errors.js'

export function createApiRouter(service, now) {
  const router = Router()
  const controller = createTribunalController(service, now)
  router.get('/dossiers', controller.list)
  router.get('/dossiers/:playerID', controller.dossier)
  router.get('/dossiers/:playerID/evidence', controller.dossierEvidence)
  router.get('/dossiers/:playerID/appeal', controller.dossierAppeal)
  router.post('/dossiers/:playerID/appeals', (request, _response, next) => {
    if (!request.is('application/json')) throw new HttpError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Use application/json.')
    next()
  }, controller.submit)
  router.get('/evidence/:evidenceID', controller.evidence)
  router.get('/appeals/:appealID', controller.appeal)
  return router
}
