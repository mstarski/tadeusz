# Tadeusz - a discord bot

[![deploy](https://github.com/mstarski/tadeusz/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/mstarski/tadeusz/actions/workflows/deploy.yml)
[![test](https://github.com/mstarski/tadeusz/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/mstarski/tadeusz/actions/workflows/test.yml)

![tadeo](assets/tadeo.png)

## How to spin up your dev tadeusz instance

### Requirements
* `Node 16+` 
* `Yarn`
* `MongoDB`
* `Discord server + account`
* `Optional: docker, docker-compose for testing container-related stuff`

### Instructions

* Create an application using [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
* Add a bot to your server
* Create `.env` file using `.env.example` as your skeleton:<br>
  `cp .env.example .env`
* Fill in environment variables with data matching your discord bot/db etc.
* Install dependencies with `yarn install`
* Run `yarn start:dev`


### Testing
* `yarn test`
