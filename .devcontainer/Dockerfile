FROM node:dubnium
WORKDIR /app

RUN apt-get update && apt-get install -y zsh
RUN echo "export PROMPT=supersonic$PROMPT:" >> ~/.zshrc
