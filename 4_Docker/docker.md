

Two things in Docker 

always remember: In Docker file 
1) set base Image
2) choose WORKDIR
3) COPY file/folder
4) Install packages
5) Set ENVIRONMENT variables
6) EXPOSE PORTS 
7) listen On PORT
8) use Volumes:
  - sync folder (bind mount) 
  - make hard copy of folder (named volume) 
  - exclude sync (anonymous volume)

[ Copy + Sync + Exclude + Hard Copy Dir , PORT , Argument , ENVIRONMENT variables]

------------
##          Docker Image + Container Commands

### 1) Image:
  - Build the image: `docker build -t imageName .` (path of Docker File)
### 2) Container:
  - Run the container: `docker run -d -p portFromOutside:portToContainer --name containerName imageNameBasedOnWhichContainerIsCreated`

## Commands:
### 1) Check images:
  - `docker image ls` or `docker images`
  - Remove image: `docker image rm imageID` or `docker rmi IMAGE_ID_OR_NAME`

### 2) Check running & Remove containers:
  - `docker ps`
  - Stop and delete running container: `docker rm containerName -f` or `docker rm CONTAINER_ID_OR_NAME`
  - Check all containers (including stopped ones): `docker ps -a`
  - Remove all stopped containers at once: `docker container prune`
  - Remove container and its volume: `docker rm containerName -fv`
  - Remove All :
   ```cmd 
    docker rm $(docker ps -a -q)
   ```
  - List containers
   ```cmd
    docker ps -a --format "{{.ID}}\t{{.CreatedAt}}\t{{.Names}}"

   ```


### 3) Docker bash shell run command:
  - Run bash shell in container: `docker exec -it containerName bash`

### 4) Check logs for crash:
  - View container logs: `docker logs containerName -f`

### 5) Add environment variables:
  - Run container with environment variables: `docker run -v %cd%:/app:ro -v /app/node_modules --env PORT=8080 -p 4000:8080 -d --name api-g-1 api-gateway-1`
  - Load environment variables from .env file: `--env-file ./.env`

### 6) Check environment variables using bash:
  - Print environment variables: `printenv`

### 7) Remove anonymous volume:
  - Remove volume: `docker volume volumeId`
  - Remove all unused volumes: `docker volume prune`

---
# Docker Volumes

Docker volumes are used while running a container. There are three types:

1. **Bind mount**: Used to sync local folder changes with docker image so no need to build image every time when code is changed.
   - Syntax: `-v pathOfFolderInLocal:pathOfFolderInContainer`
   - Example: 
     - Windows: `-v %cd%:/app` (if powershell: `-v ${pwd}:/app`)
     - Linux/Mac: `-v $(pwd):/app`
   - Note: Be careful with bind mount. If you delete a folder (like `node_modules`) from local, it will be deleted from the container as well. To avoid this, create an anonymous mount i.e. another Volume for `node_modules` folder of `/app` directory. For example: `-v %cd%:/app -v /app/node_modules`
   - To make bind mount read only: `-v %cd%:/app:ro`

2. **Anonymous volume**: Created every time we run a container. It always creates a new volume so it can be a waste of storage. To remove unused anonymous volumes, run the container and use the command: `docker volume prune`

3. **Named volume**: Used to persist data. The folder in the container as well as in the host will save data so when the container is down or the image is removed, data will be persisted in the host machine. Can be used in multiple services.
---
# Docker Ignore

To exclude all files except for the project files, you can add to `.dockerignore`:

```ignore
*
!project_directory/
## For example, to exclude all files except for the project files, you can add to .dockerignore:
*
!project_directory/
```
- Replace project_directory with the name of the directory that contains your project files.
------------------
##                    Docker Volume 


#### Docker Volume : used while running container

### 1] Bind mount: 
  - used to sync local folder changes with docker image so no need to build image
   - every time when code is changed
   - **Syntax**: 
  ```
    -v pathOfFolerInLocal:pathOfFolderInContainer  
    ex:- Windows : -v %cd%:/app (if powershell: -v ${pwd}:/app) 
       - Linux/Mac : -v $(pwd):/app
  ```
  - **Error** :Ex. if you delete node_modules folder from local it will be deleted from container as well so
       be carefull why because of bind mount 
  - **Solution** : create anonymous mount i.e. another Volume for node_modules folder of /app directory
      -  cmd: `-v %cd%:/app -v /app/node_modules`  
       -  `bind mount + anonymous mount`
  - **Problem** : Bind mount makes connection between docker conatiner and local folder so if any things changed or
    any file deleted/updated from docker container it will change in local folder as well and it is
    vice versa.....
  - **Solution** : make bind mound read only
       cmd: `-v %cd%:/app:accessLevel `         
       ---Ex read only: `-v %cd%:/app:ro `

### 2] Anynamous Volume
- when create with every time we run conatiner it Always creates new volume so it will be waste of storage
 ex in above case for node_modules folder
- docker volume volumeId
- but if along with conatiner volume for database like mysql is created them it is not good to delete it
```
VIMP : in cmd " -v " is used to delete { Anynamous volumes + named volume }
( Never use -v if want to persist data using named volume for other conatiners)
Solution to remove unused anonymous volume: 
  1)run conatiner and  2) use cmd : docker prune
```

### 3] Named Volume: 
- to persist data means folder in conatiner?Image as well as in 
  Host will save data so when conatiner is down or Image is removed data will be 
  persised in host machine (see example for mongo in compose file)
 - can be used in multiple services


## Docker Compose
- VIMP : docker file takes precedence over docker-compose
```
1) version
2) services:
   3) service_1:
      build:
         context: dockerfile location
         arg:  ( this is argument passed to docker file )
           -NODE_ENV=dev
```
- E**xecution Stack** :

  `Docker (High) <-- Docker-Compose.yml <--- Docker-compose.dev.yml`

- **Why**? 
  - When there are same operations performed in both files then which is given first in docker-compose command will take priority

### - **CMD** : 

-  **Up**:  ` docker-compose -f 1stFile.yml -f 2ndFile.yml -f 3rdFile.yml up -d `

- **down**:  ` docker-compose -f 1stFile.yml -f 2ndFile.yml -f 3rdFile.yml down -d `
- **Force build**: `docker-compose -f 1stFile.yml -f 2ndFile.yml -f 3rdFile.yml up -d --build`

- cmd to run multiple instances if NginX is used:
 ` docker-compose -f 1stFile.yml -f 2ndFile.yml -f 3rdFile.yml up -d --scale api-gate-way-ex1=2`
-----

## Docker File
```docker
FROM node:20
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \
        then npm i; \
        else npm i --only=prod; \
        fi
COPY . ./
# ENV PORT 3000
# EXPOSE $PORT
CMD ["node","server.js"]
```

-----------------------------------------
## Compose File
```docker
version: "3"
services:
  api-gate-way-ex1:
    build:
      context: .
    # ports to map the host machine port to container port
    ports:
      - "4000:$PORT"
    
  mongo:
    image : mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root123
    # named volumes used to persist data even after container is removed
    # volumes are created in the host machine in /var/lib/docker/volumes
    #  and `/data/db` is the default directory where mongo stores data
    #  basically we are mapping the host machine directory to the container directory to persist data even after container is removed
    volumes:
      - mongo-db:/data/db
volumes:
```
```docker

version: "3"
services:
  api-gate-way-ex1:
    build:
      context: .
      args:
        - NODE_ENV=dev

    # below is the port mapping from the container to the host machine but if there is another copose file which overrides this port then that port will be used in this case docker-compose.yml will override the port
    ports:
      - "5000:$PORT"
    #  env_file sets the environment variables from the file specified in the container and not in the host machine so that we can have different environment variables for different environments like dev, qa, prod etc and we can have different env files for each environment
    env_file:
      - ./.dev.env
    volumes:
    #  below is bound volume for the app folder which is required to be mounted so that we can see the changes in the code without rebuilding the image
    #  this is not required in production as we will be using the image built from the dockerfile
    #  this makes the development faster as we change the code and see the changes without rebuilding the image
    #  this maps the app folder in the host machine to the app folder in the container so what ever changes we make in the host machine will be reflected in the container
      - ./:/app
      # below is anonymous volume for node_modules which is not required to be mounted so that we can use the node_modules from the image and not from the host machine and also it will not be deleted when we do docker-compose down
      - /app/node_modules
    # environment:
    #   - PORT=3000
    command: npm run dev
```

#  Docker Network 

- If Container are running in same network then they can talk to each other
- there are different types of network in docker
-create network or use default network

### CMD: 
-  `docker inspect containerName`
-  `docker inspect network networkName`
-  `docker network ls`
-  cmd to check logs: `docker logs conatiner_name -f`
-  cmd to run bash in conatiner: `docker exec -it conatiner_name bash`
### Docker Execution Sequence of Container 
- use depends_on in compose file
