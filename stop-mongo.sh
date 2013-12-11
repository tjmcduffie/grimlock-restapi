#!/bin/bash


source ~/.profile

mongo --eval "db.getSiblingDB('admin').shutdownServer()";