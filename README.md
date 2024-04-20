# bun-express

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

`bun add -d prisma`
`bun add @prisma/client`

Bun Pisma Init
`bunx prisma init --datasource-provider sqlite`

`bunx prisma migrate dev --name init`

Folder structure

- configs, shared configuration such db
- controllers, endpoint handler
- middleware, midleware function
- models, model of database
- routes, route of controller
- schemas, zod validation of request
- services, services for controller
- utils, helper function
