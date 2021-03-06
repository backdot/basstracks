import { Photon } from '@generated/photon'
const photon = new Photon()

async function main() {
  const user1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      // password: '$2b$10$ZjONRZAxqX2pLoPax2xdcuzABTUEsFanQI6yBYCRtzpRiU4/X1uIu', // "graphql"
      tracks: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          genre: "test",
          difficulty: "BEGINNER",
          notes: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
  })
  const user2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      // password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW', // "secret43"
      tracks: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            genre: "test",
            difficulty: "BEGINNER",
            notes: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            genre: "test",
            difficulty: "BEGINNER",
            notes: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
  })
  console.log({ user1, user2 })
}

main().finally(async () => {
  await photon.disconnect()
})
