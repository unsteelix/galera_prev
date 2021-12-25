FROM node:17
WORKDIR /app
COPY . .

RUN npm install --global --force yarn
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
