#!/bin/bash

npx prisma generate

npx prisma migrate dev --name init
 
npm run seed
 
npm run build

npm run start:dist
