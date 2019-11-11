import { idArg, queryType, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.users.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Track',
      resolve: (parent, args, ctx) => {
        return ctx.photon.tracks.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterTracks', {
      type: 'Track',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.photon.tracks.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                genre: {
                  contains: searchString,
                },
              },
            ],
          },
        })
      },
    })

    t.field('track', {
      type: 'Track',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.tracks.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})
