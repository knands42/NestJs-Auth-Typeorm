#!/bin/bash
npm install

typeorm:migration:run

npm run start:dev
