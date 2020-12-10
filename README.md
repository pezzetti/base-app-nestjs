# NestJS API boilerplate

[![Maintainability](https://api.codeclimate.com/v1/badges/a32038f660cfc3acd273/maintainability)](https://codeclimate.com/github/pezzetti/base-app-nestjs/maintainability)
[![Build Status](https://travis-ci.org/pezzetti/base-app-nestjs.svg?branch=master)](https://travis-ci.org/pezzetti/base-app-nestjs)
[![codecov](https://codecov.io/gh/pezzetti/base-app-nestjs/branch/master/graph/badge.svg?token=3Vv7si5MSD)](https://codecov.io/gh/pezzetti/base-app-nestjs)

## Description
  Base application API made with NestJS, TypeORM, GraphQL, and Jest

###  Folder structure
    Code organization based on NestJS modules with Domain Driven Design, focused on codebase scalability.

### SOLID
    Using SOLID principles to provide better code design for easier maintenance and testing.

### GraphQL / REST
    You can either create API's REST or Graphql

## Installation

```bash
$ npm install
$ docker-compose up -d
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

## Endpoints
```
/users or /graphql
```

## Swagger documentation
```
/docs
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
