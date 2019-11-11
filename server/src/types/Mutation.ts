import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    // t.field('createDraft', {
    //   type: 'Track',
    //   args: {
    //     title: stringArg({ nullable: false }),
    //     notes: stringArg(),
    //   },
    //   resolve: (parent, { title, notes }, ctx) => {
    //     const userId = getUserId(ctx)
    //     return ctx.photon.tracks.create({
    //       data: {
    //         title,
    //         notes,
    //         published: false,
    //         artist: { connect: { id: userId } },
    //       },
    //     })
    //   },
    // })

    t.field('addTrack', {
      type: 'Track',
      args: {
        title: stringArg({ nullable: false }),
        // artist: {
        //   name: stringArg(),
        // },
        genre: stringArg(),
        difficulty: stringArg(),
        notes: stringArg(),
      },
      resolve: (parent, { title, artist, genre, difficulty, notes }, ctx) => {
        // const userId = getUserId(ctx)
        return ctx.photon.tracks.create({
          data: {
            title,
            artist,
            genre,
            difficulty,
            notes,
            published: false,
          },
        })
      },
    })

    t.field('deleteTrack', {
      type: 'Track',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.track.delete({
          where: {
            id,
          },
        })
      },
    })

    // t.field('publish', {
    //   type: 'Track',
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (parent, { id }, ctx) => {
    //     return ctx.photon.tracks.update({
    //       where: { id },
    //       data: { published: true },
    //     })
    //   },
    // })
  },
})
