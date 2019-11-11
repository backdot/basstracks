import { objectType } from 'nexus'

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.published()
    t.model.title()
    t.model.artist()
    t.model.genre()
    t.model.difficulty()
    t.model.notes()
  },
})
