# Enterprise SaaS Integration Platform 🚀

## Overview
A production-ready backend system that processes webhook events asynchronously and integrates with multiple SaaS platforms.

## Features
- Webhook ingestion API (Express.js)
- Asynchronous job processing using BullMQ (Redis)
- PostgreSQL for persistent storage
- Stripe API integration
- Slack real-time notifications
- Scalable worker architecture

## Architecture
Webhook → API → Queue → Worker → DB → Slack

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Redis (BullMQ)
- Stripe API
- Slack Webhooks

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
Create `.env`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=saas_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
STRIPE_KEY=your_key
SLACK_WEBHOOK_URL=your_webhook
```

### 3. Start services
```bash
node src/index.js
node src/workers/worker.js
```

### 4. Test API
```bash
curl -X POST http://localhost:3000/webhook \
-H "Content-Type: application/json" \
-d '{"user":"test"}'
```

## Author
Krishna Mankali
