# Expresso (Workast)
API to manage users and articles.

## How to use

#### Prerequisites
- Having docker-compose installed: https://docs.docker.com/compose/
- Having a mongo client installed (optional - used for testing locally)
- NodeJs (optional - used for testing locally)

#### Installation

1) Open your favourite terminal and go to the directory where you wish to install.

2) Clone the repository and enter the directory that was created.
```
git clone https://github.com/Makiavelo/expresso.git
cd expresso
```
3) run:
```
npm install
docker-compose up --build
```

4) Open a browser and go to: http://localhost:3000/api-docs
The swagger api documentation should be ready to check and use.

#### Testing

##### Method 1 (requires NodeJS and a Mongo client on the host machine)
Open another terminal, and go to the root of the project (expresso). Once you're there execute the following command
```
ACCESS_TOKEN=5CD4ED173E1C95FE763B753A297D5 ./node_modules/.bin/cucumber-js ./tests
```
All tests should be passing.

##### Method 2 (no requirements)
The tests can also be ran from inside the docker container, to ssh into the node container run:
```
sudo docker exec -i -t node_api /bin/bash
cd /usr/src/app
ACCESS_TOKEN=5CD4ED173E1C95FE763B753A297D5 ./node_modules/.bin/cucumber-js ./tests
```
all the cucumber files are stored inside the 'tests' folder (gherkins and step definitions)

## How to update files / view changes

Modify the required files, press CTRL+C on the terminal running the containers to shut them down down, and then run the containers again, but this time the "--build" argument is not necessary.
```
docker-compose up
```
the docker compose file uses mounted volumes, so your current repo folder is mounted inside the container. That means that you can edit your files and see the changes after restarting the node script.
restarting only the node container works.


## Deployment

When working with staging/prod environments, the same instructions apply. The only difference is the files we use for compose.
Docker compose allows to use file overrides, so depending on the place to deploy, you can use one of the following: 

    - For development: 
    docker-compose up --build
    
    - For staging: 
    docker-compose -f docker-compose.yml -f docker-compose.staging.yml up --build
    
    - For prod: 
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
    
The docker compose file contains several ENV variables that are needed by the app.

### Useful docker comands

- docker ps (lists all the containers running)
- docker exec -i -t CONTAINER_ID_OR_NAME /bin/bash (connect to the container CLI)

## API Authentication
All the requests require a header parameter called:  X-API-Key
The value required for that field is set in the docker compose file as an ENV var called 'ACCESS_TOKEN'.

API Call example:
```
curl -X POST "http://localhost:3000/api/v1/user" -H "accept: application/json" -H "X-API-Key: 5CD4ED173E1C95FE763B753A297D5" -H "Content-Type: application/json" -d "{ \"name\": \"string\", \"avatar\": \"http://google.com/image.jpg\"}"
```

## Configuration
The API can be configured with ENV vars and config files. I'm using the 'config' npm module for this. For more details
check: https://www.npmjs.com/package/config
 
A short explanation about how config files work:

- default.json: is the first file loaded.
- ENVIRONMENT.json: Can be production, development, etc. this fille overrides the properties from default.json depending on the NODE_ENV.
- custom-environment-variables.json: This file holds the ENV vars, and overrides all the other files with it's values.

I've added those files with the ".template" extension, just rename and use. default.json has the configs required for the app to run on local containers.

## Tech stack

- Express js (https://expressjs.com/)
- Mongodb driver for node
- Joi for validations (https://www.npmjs.com/package/joi)
- Cucumber for testing (https://github.com/cucumber/cucumber-js and https://cucumber.io/)
- Swagger ui express for live docs (https://www.npmjs.com/package/swagger-ui-express)
- MVC Pattern implemented without using modules.

## Notes for developers
Main files:
```
bin/www: contains the server and the mongo connection pooling.
app.js:  the entrypoint where all routes/middlewares are called.
```
A brief description of the main folders:
- api: this folder contains subfolders with the main modules. Each module is an entity of the application, users and articles.
each module's folder has the following files:

```
- controller.js: contains the actions for each route
- model.js: contains the entity that is persisted
- routes.js: contains the paths of the module
- validator.js: contains the validations of the module
- repository.js: contains the queries of the module
- collection-model.js: a collection of models of the module (used primarily by the repository)
```

there are two more folders under 'api' that are not directly related to modules:
```
base: has all the base classes that simplify the implementations. The model base classes contain some magic methods to get a developer productive quiclky (they can be overrided). Also the base controller class is the one in charge of all the responses.
middleware: contains the middlewares required by the api. 'security/auth-controller.js' to validate the tokens and 'handlers/errors-controller.js' to handle 404's and unexpected errors
```
## Documentation
The documentation available is this README and the Swagger spec. All the definitions live in the routers (from articles and users module), and the documentation is generated
 by a helper function that puts everything together and serves it under the /api-docs/ path. 

## Final thoughts and comments
I focused on completing the requirements without adding extra features. 
With that said, there's a lot of room for this api to grow.

These are some of the points where I would focus:

- Implementing JWTs (Jason web tokens) for authentication.
- Paginating search results
- Adding indexes on the Mongo if needed
- Adding a reverse proxy to handle https connections (tokens with http are bad! :P)
- Adding workers to make full use of CPU 

On the testing side, I'm from the functional tests line of thought. That's why I chose cucumber, you get a lot more coverage
in comparison to unit tests. Of course having both is great, but if I have to choose, I alwas prefer to have functionals.
In this case in particular, my main focus was to have all the api endpoints tested.