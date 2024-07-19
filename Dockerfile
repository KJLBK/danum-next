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

# Step 3: Setup Node.js for running the Next.js app
FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
