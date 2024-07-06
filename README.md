# Backend test
## Required tool
- Docker: https://www.docker.com/get-started/
- PostgresSQL: https://www.postgresql.org/
- pgAdmin: https://www.pgadmin.org/
## Usage
- Step 1: Install and install node (version 18.x) from https://nodejs.org/en/download/package-manager/current
- Step 2: Install and start Docker
- Step 3: Pull `postgres` image in Docker
  - Setup environment:
    POSTGRES_USER=root
    POSTGRES_PASSWORD=root
  - Start image 
- Step 3: Pull `dpage/pgadmin` image in Docker
  - Setup environment:
    PGADMIN_DEFAULT_EMAIL=example@gmail.com
    PGADMIN_DEFAULT_PASSWORD=root
  - Start image
- Step 4: Create Database + Table via database.txt file  
- Step 4: Checkout src code
- Step 5: Update env.local file
- Step 6: npm i
- Step 7: npm run start
