FROM node:16

WORKDIR /usr/src/witch-it-space

COPY package*.json ./
RUN yarn install

COPY . .

CMD ['yarn build && yarn start']
