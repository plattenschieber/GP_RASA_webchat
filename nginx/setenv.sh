#!/bin/bash
echo "Replace ENV in default.conf"
echo $ROOT
envsubst '${ROOT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

echo "Will start nginx now!"
