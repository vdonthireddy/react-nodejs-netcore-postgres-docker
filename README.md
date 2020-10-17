## react-nodejs-netcore-postgres-docker
# TLDR
1. On your Mac, install [Docker](https://www.docker.com/products/docker-desktop)
2. Open Terminal and run
```
git clone https://github.com/vdonthireddy/react-nodejs-netcore-postgres-docker
cd react-nodejs-netcore-postgres-docker
bash allrun.sh
```
3. Open browser and go to http://localhost:8080 \
That is all!!!

#### Note: This project works only on Mac (You need to modify the allrun.sh file and dockerfiles for Windows)
#### STEP 1a (for local development): Make sure you have nodejs and npm installed: https://www.npmjs.com/get-npm
#### STEP 1b: Make sure you have docker installed: https://www.docker.com/products/docker-desktop
#### STEP 2: Use terminal to clone my git repo
```
git clone https://github.com/vdonthireddy/react-nodejs-netcore-postgres-docker
```
#### STEP 3: Run the following commands 
```
cd react-nodejs-netcore-postgres-docker
bash allrun.sh
```
#### STEP 4: Open the url in a browser
http://localhost:8080 

#### STEP 5: To use C# to get data from PostGres, please set the following value in .env file:
Go to /react-nodejs-netcore-postgres-docker/micro-app-client/.env
edit the following line appropriately (you can find this line in getNotes() function). Use '/api/' for C# and '/' for nodejs directly making calls to PostGres
```
REACT_APP_.API_URL_PREFIX=/api/
```
If you want to persist the data, please uncomment the following lines in docker-compose.yml
```
    # volumes:
    #   - ./postgres-data:/var/lib/postgresql/data
```
#### If you are interested to view logs inside the containers, you can run the following command:
```
docker logs --follow ContainerName/ContainerID
```
### About this Project:
This project is divided into three parts:
1. Micro App
    - React App (Deployed in NodeJS)
    - NodeJS (Can call PostgreSQL directly, or Micro Service APIs)
2. Micro Service (Written in .Net Core 5.0 and C#)
3. PostgreSQL (Database)