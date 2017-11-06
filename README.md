# issue-tracker

  - [Installation](#installation)
  - [Usage](#usage)
    - [Running application](#running-application)
    - [Managing services](#managing-services)

## Installation

Requirements:

  - Docker 17.04 CE Edge or greater (*[why?](https://blog.docker.com/2017/05/user-guided-caching-in-docker-for-mac/)*)
    - [Get it for macOS](https://docs.docker.com/docker-for-mac/install/)
    - [Get it for Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)
    - [Get it for Fedora](https://docs.docker.com/engine/installation/linux/fedora/)
  - Docker Compose
    - Docker for Mac, Docker for Windows, and Docker Toolbox include Docker Compose
    - [Get it for other platforms](https://github.com/docker/compose/releases)
  - If you're running some sort of the Linux, check [additional linux requirements](#additional-linux-requirements)

## Usage
**It's really simple!**

 - Clone this repository
   ```sh
   git clone git@github.com:rastasheep/issue-tracker.git issue-tracker
   cd issue-tracker
   ```

  - Run cluster
    ```sh
    docker-compose up -d
    ```
    Initial run will cause download of all docker images, so be patient it shouldn't take too long.

### Running application

By default each service has initial start command which will be run when cluster is created. For web applications it install deps, migrate database and start the server. So when you create cluster each application is properly initialized and it's listening for incoming connections. So you can access applications at the following addresses:

  - [api] - Main api application
    - **[http://localhost:8001/](http://localhost:8001/)**

If you want to execute some additional commands in service's environment you can do that on two ways:

  - Execute command in already running service **recommended**
    ```sh
    docker-compose exec <service-name> <command>
    ```

    *example*: run linter alongside running server on api service
    ```sh
    docker-compose exec api yarn run lint
    ```

    *example*: run tests alongside running server on api service
    ```sh
    docker-compose exec api yarn run test
    ```

  - Start service and replace default command with custom one
    ```sh
    # requirement that service is not running
    docker-compose run <service-name> <command>
    ```

    *example*: run tests without running app server
    ```sh
    # requirement that service is not running
    docker-compose stop api
    docker-compose run api yarn run test
    ```

### Managing services
**Docker compose all the things!**

Docker compose is used for managing cluster of services, to know more about it check [official docs](https://docs.docker.com/compose/overview/).

Currently app defines following services: `api`, `mongo`. Here are some basic commands for managing them.

  - List all running services
    ```sh
    docker-compose ps
    ```

  - Run cluster (all services, if service name not provided)
    ```sh
    docker-compose up -d [<service-name>]
    ```
    Notice `-d` flag, it means that cluster is run in detached mode without printing log of all services. **recomended**


  - Restart cluster (all services, if service name not provided)
    ```sh
    docker-compose restart [<service-name>]
    ```

  - Tear down whole cluster
    ```sh
    docker-compose down
    ```

  - Stop particular service
    ```sh
    docker-compose stop [<service-name>]
    ```

  - View log of the service
    ```sh
    docker-compose logs <service-name>
    ```
    Optional `-f` flag, which follows newly generated logs, otherwise command will just print log and exit.

## Additional linux requirements

### Manage Docker as a non-root user
  [Official how-to](https://docs.docker.com/engine/installation/linux/linux-postinstall/#manage-docker-as-a-non-root-user).

### Mounting directories

Mounting directories to docker containers on Linux is mess when it comes to the directory and file permissions. To avoid mess with our setup current suggestion is to make sure that user on host have user id 1000 and group id 1000.

To check ids run:
```sh
id -u
id -g
```

If your user id and group id is different you can fix on two ways:

  - Create new user with correct id's and use it
    ```sh
    useradd -u 1000 -g 1000 -s /bin/bash myname
    ```
    Where `myname` is username used as example, you can use whatever you want here.


  - Change user and group id
    [How-to](https://www.cyberciti.biz/faq/linux-change-user-group-uid-gid-for-all-owned-files/)
    [How-to 2](http://stackoverflow.com/q/18248056/2760469)
