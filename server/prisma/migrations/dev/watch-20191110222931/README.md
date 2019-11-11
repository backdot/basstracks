# Migration `watch-20191110222931`

This migration has been generated by philippwalterJS at 11/10/2019, 10:29:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "basstracks"."Track" ADD COLUMN "user" text   REFERENCES "basstracks"."User"("id") ON DELETE SET NULL;

ALTER TABLE "basstracks"."User" ADD COLUMN "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
ADD COLUMN "role" text NOT NULL DEFAULT 'USER' ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..watch-20191110222931
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,48 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://prisma:prisma@localhost:5432/postgres?schema=basstracks"
+}
+
+model User {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  email     String   @unique
+  name      String?
+  role      Role     @default(USER)
+  tracks    Track[]
+}
+
+model Track {
+  id         String   @default(cuid()) @id
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt
+  published  Boolean  @default(true)
+  title      String
+  artist     Artist?
+  genre      String?
+  difficulty Difficulty
+  notes      String?
+}
+
+model Artist {
+  id       String  @default(cuid()) @id
+  name     String
+  tracks   Track[]
+}
+
+enum Role {
+  USER
+  ADMIN
+}
+
+enum Difficulty {
+  BEGINNER
+  NOVICE
+  INTERMEDIATE
+  ADVANCED
+  EXPERT
+}
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191110222931)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191110222931'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```