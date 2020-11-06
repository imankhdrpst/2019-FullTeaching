#!/bin/sh
#gradle build
sudo gradle clean build -x test
#docker build image
sudo docker build ./backend --tag full-teaching:1.0
#docker compose up
sudo docker-compose up
