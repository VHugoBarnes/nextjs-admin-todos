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
```
Next steps:   
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read [https://pris.ly/d/getting-started](https://pris.ly/d/getting-started)  
2. Set the `provider` of the `datasource` block in `schema.prisma` to match your database: `postgresql`, `mysql`, `sqlite`, `sqlserver`, `mongodb` or `cockroachdb`.   
3. Run `prisma db pull` to turn your database schema into a Prisma schema.   
4. Run `prisma generate` to generate the Prisma Client. You can then start querying your database.   

More information in our documentation:   
[https://pris.ly/d/getting-started](https://pris.ly/d/getting-started)