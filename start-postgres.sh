#!/bin/bash
docker run -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=taskmanagement \
  -v $PWD/database/data:/var/lib/postgresql/data postgres     