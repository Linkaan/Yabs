# Welcome to Yabs

[![DeepScan grade](https://deepscan.io/api/teams/12020/projects/14980/branches/290973/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12020&pid=14980&bid=290973)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d8dce4a40b65883e996b/test_coverage)](https://codeclimate.com/github/itggot-TE4/Yabs/test_coverage)
[![Actions Status](https://github.com/itggot-TE4/Yabs/workflows/Integration/badge.svg)](https://github.com/itggot-TE4/Yabs/actions)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/context:javascript)

## What's Yabs?

Yabs or yet another booking system is a collection of tools for creating card id generation and loans of literature.

## License

Yabs is released under the [MIT License](https://opensource.org/licenses/MIT).

## Development environment

Supports development under Mac with docker for mac, Linux with docker and Windows running docker with WSL2 backend. VSCode is used for development. Recommended VSCode extensions:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.ruby)
- [endwise](https://marketplace.visualstudio.com/items?itemName=kaiwood.endwise)
- [Better Align](https://marketplace.visualstudio.com/items?itemName=wwm.better-align)

Also install nodejs and yarn locally so linter and Vetur works properly in editor. Run `yarn install` in /frontend to install node modules on host machine.

To make use of the pre-commit hooks setup by this project you are also required to run `yarn install` in the root of YABS

## Installation & Configuration

Clone the Yabs repository (https://github.com/itggot-TE4/Yabs) to a desireable place on your computer. 

Open the cloned Yabs project and create a secrets.yml file in backend/config/secrets.yml
Copy and paste the content of the secrets.yml file (see Slack) containing google_client_secrets into your empty secrets.yml file to the cloned project.

The app runs in a docker container. After setting up the container (see below), all interaction with the app is managed through the container.

### Visual Studio Code

Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension

### Docker

Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

Build the container with:

```console
docker-compose build
```

This builds the container and copies the source files to the container.

Start the app container and the db container:

```console
docker-compose up
```

## Connecting to the container

### Visual Studio Code

Click the "Remote Explorer" icon in the left menu.
Make sure "Containers" is selected in the top dropdown

Select `yabs_app_1` and click `Open` or `Attach Container` - Select the `/app` folder.

### Terminal

You will probably want two terminals (or terminal tabs) connected to the container - one for backend and one for frontend

```console
docker-compose exec app zsh
```

#### GitHub access

In the container, run:

```console
gh auth login
```

And authenticate to GitHub

## Interacting with the servers

### Setup db

In `/app/backend`

```console
rails db:setup
```

### Start Backend
In `/app/backend`


```console
rails s -b 0.0.0.0
```
### Start Frontend

```console
yarn run serve
```

You can now access the frontend at [http://localhost:8080](http://localhost:8080)
## Running unit tests

Rails fixtures are stored as snapshots. They only need to be updated if changes are done to seed.rb file:

```console
rails db:seed fixture=all
```

To run the unit tests:
### Backend

In `/app/backend`

```console
rake
```
### Frontend

In `/app/frontend`

```console
yarn test:unit
```

## Reseeding database

To reseed the database run these commands in running docker backend:

In `/app/backend`

``` console
docker-compose exec backend rails db:setup
docker-compose exec backend rails db:fixtures:load
```
