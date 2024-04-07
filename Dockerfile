FROM node:14-alpine
RUN apk add --no-cache tzdata
ENV TZ Asia/Ho_Chi_Minh

ENV NODE_ENV=production

WORKDIR  /opt/gearvn.dms.web

COPY . .

RUN npm install --production

COPY . .

CMD ["npm","run","start:prod"]
