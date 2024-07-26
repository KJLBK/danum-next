# Step 1: Build the Next.js application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Setup Nginx with SSL and reverse proxy
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates (these will be mounted in runtime)
COPY ./certificate.crt /etc/ssl/certificates/certificate.crt
COPY ./private.key /etc/ssl/certificates/private.key

# Copy built Next.js app to Nginx
COPY --from=builder /app/.next /usr/share/nginx/html/_next
COPY --from=builder /app/public /usr/share/nginx/html

# Ensure Nginx is running
CMD ["nginx", "-g", "daemon off;"]
