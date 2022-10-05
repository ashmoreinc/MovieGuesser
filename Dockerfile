FROM node:16

WORKDIR /usr/src/movieguesser

#----- Install dependencies
COPY ./guessertainer/package*.json ./
RUN npm install
RUN npm install react-scripts@5.0.1 -g


#----- Copy over the source
COPY ./guessertainer/ .

#----- Build the application
RUN npm run build
RUN npm install -g serve


#----- RUN
CMD ["serve", "-s", "build"]
