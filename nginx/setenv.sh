#!/bin/bash
echo "Replace ENV in default.conf"
envsubst '${ROOT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

ls $ROOT
cat /etc/conf.d/default.conf

echo "Will start nginx now!"