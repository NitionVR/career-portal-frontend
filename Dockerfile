# Stage 1: Build the Angular application
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/etalente-clone-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
