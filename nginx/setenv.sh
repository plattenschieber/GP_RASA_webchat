#!/bin/usr/env bash

pwd
ls /etc/conf.d/
cat /etc/conf.d/default.conf
envsubst < /etc/conf.d/default.conf > /etc/conf.d/default.conf
cat /etc/conf.d/default.conf
