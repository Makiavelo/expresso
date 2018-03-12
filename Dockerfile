FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
ADD . /usr/src/app/
EXPOSE 3000
CMD ["sleep", "5"]
CMD ["npm", "start"]