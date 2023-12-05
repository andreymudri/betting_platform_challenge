## Overview

Betting with friends on the outcome of a football game has never been more exciting than it is today. Over the recent years, this phenomenon has taken on a new dimension, with numerous applications emerging to facilitate this experience. This README provides an overview of our betting app, outlining its purpose and functionality.

## Features

Our betting app simplifies the process for users, following a straightforward flow:

- Sports Events Display: A variety of upcoming sports events are presented to the user.
- User Bet Placement: Users can place bets within a specific sports event, predicting outcomes such as the winner of a football match (e.g., Flamengo vs. Botafogo).
- Event Outcome: Once the sports event concludes, users who correctly predicted the outcome receive a monetary reward.

## Notable technologies used

- Prisma ORM
- PostgreSQL Database
- Typescript
- Express

## Usage

To run the application, follow these steps:


1. Clone the repository by running

```bash
git clone https://github.com/andreymudri/betting_platform_challenge.git
```

2. Install the dependencies by running

```bash
cd betting_platform_challenge && npm install
```

3. Start the application by running

```bash
npm run dev
```

Alternatively you can use Docker

# Using the Docker Image

This tutorial will guide you through the process of using the Docker image you've pushed to Docker Hub.

## Prerequisites

Make sure you have Docker installed on your machine. If not, you can download and install it from the official Docker website: [Get Docker](https://docs.docker.com/get-docker/)

## Docker Compose

```bash
docker compose build
docker compose up

```

Access the Application
Once the container is running, you can access your application by opening a web browser and navigating to http://localhost:3000.

Stop and Remove the Container
When you're done using the application, you can stop and remove the Docker container with the following commands:

```bash

docker stop container_id
docker rm container_id
```

Replace container_id with the actual container ID or name. You can find the container ID by running docker ps or docker ps -a to list all containers.
=======
1. Clone the repository by running
2. ```bash
   git clone https://github.com/andreymudri/Backend_Technical_Challenge.git 
```
3. Install the dependencies by running 
```bash
cd Backend_Technical_Challenge && npm install
```
4. It is also needed to create a .env file inside the base folder with: <br>
 DATABASE_URL - Self explanatory <br>
 PORT - For your application, else itll just use the default
5. Start the application by running 
```bash
npm run dev
```