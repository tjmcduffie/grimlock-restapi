#!/bin/bash


source ~/.profile

mongod --config db/mongo.conf;

nodemon ./server.js;
