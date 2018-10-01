#!/bin/bash
echo "Replace ENV in default.conf"
echo $ROOT
cat /etc/nginx/conf.d/default.conf
envsubst '${ROOT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

echo "Will start nginx now!"
