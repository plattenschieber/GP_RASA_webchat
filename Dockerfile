FROM node:8 as builder

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app
# If you are building your code for production
# RUN npm install --only=production
WORKDIR /ng-app

COPY . .

# build the dist version of the js
RUN npm run build

FROM nginx

RUN rm -rf /usr/share/nginx/html/*

# copy default config
COPY /nginx/default.conf /etc/nginx/conf.d/
COPY /nginx/setenv.sh /etc/nginx/conf.d/
RUN chmod 777 /etc/nginx/conf.d/setenv.sh

COPY --from=builder /ng-app/dist /usr/share/nginx/html/static-online-training
COPY --from=builder /ng-app/dist /usr/share/nginx/html/static
COPY --from=builder /ng-app/static /usr/share/nginx/html/static
COPY --from=builder /ng-app/assets /usr/share/nginx/html/static/assets
COPY --from=builder /ng-app/static-online-training /usr/share/nginx/html/static-online-training
COPY --from=builder /ng-app/assets /usr/share/nginx/html/static-online-training/assets

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
