## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Environemnt Setup
create a .env file in the root of the project with the following code. 

```
NODE_ENV=development
SERVER_PORT=3003
DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=root
DB_PASSWORD=""
DB_NAME=bookstore
DB_TYPE=mongodb
```
## API

```bash
$ npm start dev
```
```
http://localhost:3003/api
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](LICENSE).
