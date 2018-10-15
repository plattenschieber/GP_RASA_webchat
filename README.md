# Rasa Webchat & Online Trainer
This project is a fork of the WebChat widget from [MrBot-Ai](https://github.com/mrbot-ai/rasa-webchat).
We developed a custom online trainer where you can train and build your bots stories.
Furthermore this project could be served with docker in order to test the widget.

## Structure

* *docker* contains all docker-compose files, there are several to start the webchat in different modes.
* *nginx* contains configuration for the http-server nginx.
* *src* contains the whole source code of the widget.
* *static* contains static files, like: index.html. Would be used to start the webchat in prod mode.
* *static-online-training* contains static files, like: index.html. Would be used to start the webchat in trainer mode.
* *static-dev* contains static files, like: index.html. Would be used for local development.

Other files or directories are from the main project, for detailed documentation on this code please search on [MrBot-Ai](https://github.com/mrbot-ai/rasa-webchat).

## Deploy and run the project

### locally
To run this project locally you need to install node.js and npm as a package manager. 
To install all dependency please execute the following command. 
This could eventually throw some errors due to some tests that we will not fix.
```bash
npm install
```
Afterwards you can run the local development server by the command:
```bash
npm run dev
```

### Build
To deploy and run this project docker is mandatory, you would need to install docker as well as docker stack or docker compose.
The project would be deployed with docker build. It will be tagged with our registry name and the project name.

```bash
docker build -t docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat .
```

### Run
This project can be started in different modes. The modes differs in configuration and function.
* *local* local setup for docker, will run the default configuration of the project.
  ```bash
    docker-compose -f docker/docker-compose.yaml -f docker/docker-compose.local.yaml up -d
  ```
* *prod* production setup, will run the webchat widget for customers.
  ```bash
    docker-compose -f docker/docker-compose.yaml -f docker/docker-compose.prod.yaml up -d
  ```
* *trainer* trainer setup, will run the online trainer widget to train and build new stories.
  ```bash
    docker-compose -f docker/docker-compose.yaml -f docker/docker-compose.trainer.yaml up -d
  ```