# C-CHAIN Test App

## Description
[NestJS ](https://nestjs.com) app for Ethereum C-Chain block transactions with [Viem](https://viem.sh) library

## Prerequisites
- Node.js
- PNPM
- PostgreSQL
- Create a database named "c-chain-app"

## Installation
 1. Install all dependencies: ```pnpm i```
 2. Build: ```pnpm build```
 3. Create .env file (check .env.local)
 4. Run migrations: ```pnpm migrate```
 5. Start application: ```pnpm dev```

## Seed data
Optionally we can seed transaction's dumb by running the following command; just put the csv file named "transactions.csv" with your dump data inside "/data" folder; check the example in "/data/transactions.csv": ```pnpm seeder```

## Playground
Go to [http://localhost:{{port}}/docs ](http://localhost:3000/docs) to view and test all rest endpoints with [Swagger](https://swagger.io)
