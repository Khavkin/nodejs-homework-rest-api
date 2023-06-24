FROM node:20-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
ENV PORT=3000
EXPOSE 3000
COPY . .
RUN yarn install --production
CMD ["node", "/app/server.js"]