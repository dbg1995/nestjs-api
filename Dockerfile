FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --only=development

COPY . .

RUN yarn build

CMD ["node", "dist/main"]
