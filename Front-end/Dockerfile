# Step 1: Build
FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run
FROM node:lts
WORKDIR /app
COPY --from=builder /app ./
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
