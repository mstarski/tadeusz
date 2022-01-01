# Tadeusz - a discord bot

## Deployment
To start tadeusz on remote server you have to:

1. Have an access to the private image stored on the AWS ECR.
2. Valid .env file with all the necessary configuration (necessary keys declared in .env.example)
3. Have a copy of `start.sh` script (from the `scripts` directory)

On your remote create a directory for the tadeusz config files (i.e `~/tadeusz`).
Inside place an `env` file (without a dot before) and `start.sh` script.
Run the start script - it should pull the necessary things from the ECR and start a bot instance.

The default location for the `env` file is `./env`, but if you want to change it for some reason you can pass
the path as an argument to the start script i.e:

```
./start.sh ../.env # If you want to run it from the scripts folder locally
```
