FROM node:20

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

RUN npm install
RUN npm run build
RUN npm run push

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "start"]
