import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isTrackOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const user = await context.photon.tracks
      .findOne({
        where: {
          id,
        },
      })
      .user()
    return userId === user.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    filterTracks: rules.isAuthenticatedUser,
    track: rules.isAuthenticatedUser,
  },
  Mutation: {
    // createDraft: rules.isAuthenticatedUser,
    deleteTrack: rules.isTrackOwner,
    // publish: rules.isTrackOwner,
  },
})
