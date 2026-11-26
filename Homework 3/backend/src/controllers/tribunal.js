export function createTribunalController(service, now) {
  return {
    list: async (_request, response) => response.json({ data: await service.getDataset() }),
    dossier: async (request, response) => response.json({ data: await service.getCase(request.params.playerID), meta: { serverNow: new Date(now()).toISOString() } }),
    dossierEvidence: async (request, response) => response.json({ data: (await service.getCase(request.params.playerID)).evidence }),
    evidence: async (request, response) => response.json({ data: await service.getEvidence(request.params.evidenceID) }),
    dossierAppeal: async (request, response) => response.json({ data: await service.getDossierAppeal(request.params.playerID) }),
    appeal: async (request, response) => response.json({ data: await service.getAppeal(request.params.appealID) }),
    submit: async (request, response) => {
      const data = await service.submitAppeal(request.params.playerID, request.body)
      return response.status(201).location(`/api/appeals/${data.id}`).json({ data })
    },
  }
}
