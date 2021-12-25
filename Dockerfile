FROM node:16-alpine3.14
WORKDIR /app
COPY . .
RUN npm install --global --force yarn
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
