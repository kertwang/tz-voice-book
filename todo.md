# TODO:

> Migrating from Firebase to Locally running server

## High Priority

- [] deployment + local config
  - deploy onto heroku basic version
  - get database up and running and connected

- [] figure out object store for audio files.
  //maybe we can keep the existing one for now?

- [] add back middleware
  - [] auth (basic for now)
  - [] morgan/logging
  - [] cors



## Low Priority
- api tests
  - we aren't going to worry about this just yet - we can just test manually for now
  - ideally, we will be able to define a test plan, and execute said plan

- migrate from yarn back to npm
- tidy up env vars
- switch out object store?
- Add proper logging library (Winston?)
- CI/CD Config?


## Done:

- [x] replace firebase functions runner with proper (express?) server
  - [X] Admin
  - [x] Twiml

- [x] migrate firestore database to psql
  - [X] bot
  - [X] block
  - [X] flow
  - [X] message

- [X] init gulp file for populating api
  - Almost done - need to fix the upsert/constraints on duplicates for `block` and `flow`

- [x] replace all database calls with database library
  - [x] rehydrate config
  - [x] write tests for existing methods?
  - [x] change out methods?

- twimlHandler
  - [x] implement `postBot`
  - [x] implement `postGather`
  - [x] implement `triggerCall`

- [x] test first call