<h1 align="center">
  <a href="https://github.com/Alamnzr123/test-tsp-be">
      Backend Test for PT TXX
  </a>
  <br />
</h1>

**Backend Test for PT TXX** is Backend Test Build using NodeJS.

# Description

To run Application you need install Backend and Frontend side, which is Mandatory
This repo include Backend that buid using NodeJS. For Frontend clone this Repo
**https://github.com/Alamnzr123/test-tsp-fe**

Tech Stack : NodeJS
Database : PostgreSQL

# Installation

```
    npm install
```

# How to Run Apps

1. Open PgAdmin (POSTGRESQL)

2. Create database name "test_tsp"

3. Edit src\database\config.json file with your configuration settings

```
  "development": {
    "username": "postgres",
    "password": "alam",
    "database": "test_tsp",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
```

4. Migrate database using following commands

```
npx sequelize-cli db:migrate
```

5. Run application

```
npm run start
```

6. Try every API method on Postman Which i have been tested with the following files TEST-PT TRI SINAR PURNAMA.postman_collection.json