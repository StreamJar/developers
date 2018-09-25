FROM nginx:1.14

RUN apt-get update \
	&& apt-get install -y wget xz-utils git python make g++ \
	&& wget https://nodejs.org/dist/v8.9.1/node-v8.9.1-linux-x64.tar.xz \
	&& tar -xJf node-v8.9.1-linux-x64.tar.xz -C /usr/local --strip-components=1 \
	&& rm node-v8.9.1-linux-x64.tar.xz

RUN mkdir -p /root/.npm-global
RUN whoami

ENV PATH=/root/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/root/.npm-global
RUN mkdir ~/.ssh \
	&& ssh-keyscan -H github.com >> ~/.ssh/known_hosts \
	&& echo "daemon off;" >> /etc/nginx/nginx.conf \
	&& echo "server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; try_files \$uri \$uri/ /index.html =404; } }" > /etc/nginx/conf.d/default.conf

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN ls .
RUN npm config set registry https://npm.sjsrv.uk
RUN npm install
COPY . /usr/src/app
ARG BUILD_NUMBER=internal
ENV BUILD_NUMBER ${BUILD_NUMBER}
RUN npm run prod && cp -r dist/* /usr/share/nginx/html

CMD [ "nginx" ]
EXPOSE 80
