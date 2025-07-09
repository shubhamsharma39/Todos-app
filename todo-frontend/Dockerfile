# ---------- build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# copy package files & install deps
COPY package*.json ./
RUN npm install

# copy source + env files (IMPORTANT)
COPY . .

# tell CRA to read REACT_APP_BACKEND_URL at build time
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# ---------- run stage ----------
FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
