# Movie Guesser
This is the frontend for a movie guesser game, this will eventually 
include song guessing and game guessing.

-----
## Docker
To run this application in docker, you need to first build the image, then run a container using that image as follows.
```
docker build . -t {user}/{image_name}
docker run -p 3000:3000 {user}/{image_name}
```

For the run command, the -d tag is optional, thisll automaticallay detach from the container.
You can change the port to what ever works for you

-----

### Stack
This is a react app. The app will rely on multiple microservices to run different features. For now only the movie guesser app is implemented, also me=aking it the only microservice that is used.