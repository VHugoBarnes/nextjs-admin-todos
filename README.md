# Admin todos

## Install
1. Run database
```bash
docker-compose up -d
```

2. Setup .env file   
Copy `.env.template` and rename the file to `.env`.   

3. Prisma setup
```bash
pnpm dlx prisma init
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
```
Next steps:   
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read [https://pris.ly/d/getting-started](https://pris.ly/d/getting-started)  
2. Set the `provider` of the `datasource` block in `schema.prisma` to match your database: `postgresql`, `mysql`, `sqlite`, `sqlserver`, `mongodb` or `cockroachdb`.   
3. Run `prisma db pull` to turn your database schema into a Prisma schema.   
4. Run `prisma generate` to generate the Prisma Client. You can then start querying your database.   

More information in our documentation:   
[https://pris.ly/d/getting-started](https://pris.ly/d/getting-started)

Start using Prisma Client in Node.js (See: [https://pris.ly/d/client](https://pris.ly/d/client))   
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```
or start using Prisma Client at the edge (See: [https://pris.ly/d/accelerate](https://pris.ly/d/accelerate))   
```typescript
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()
```

See other ways of importing Prisma Client: [http://pris.ly/d/importing-client](http://pris.ly/d/importing-client)   

4. Execute seed.
```http
[GET] http://localhost:8080/api/seed
```