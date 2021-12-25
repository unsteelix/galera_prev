FROM node:17
WORKDIR /app
RUN npm install --global --force yarn
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
