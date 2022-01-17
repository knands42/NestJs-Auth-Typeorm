#!/bin/bash
npm install -f

npm run typeorm:migration:run

npm run start:dev
