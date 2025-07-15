# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
COPY package*.json ./
RUN npm install
COPY . .

# 👇 Clean cache and build
RUN echo "Using API: $REACT_APP_BACKEND_URL" && rm -rf node_modules/.cache && CI=false npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 👇 Custom nginx config to proxy /api to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





