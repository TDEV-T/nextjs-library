FROM node:current-alpine

RUN npm install -g npm@10.4.0

WORKDIR /app

COPY . . 

RUN npm i

CMD ["npm" , "run" , "production"]