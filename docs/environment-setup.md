# Backend Environment Configuration Guide

## Overview

The backend requires several environment variables to run properly. These are configured in the `.env` file.

## Required Environment Variables

### Database Configuration

```
DATABASE_URL=postgresql://edtech_user:edtech_password_123@localhost:5432/edtech_db
```

**For Production:**
```
DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/edtech_db
```

Where:
- `username`: Database user (e.g., `edtech_prod`)
- `password`: Strong password (min 16 characters)
- `host`: Database server hostname (e.g., `db.example.com`)
- `port`: Database port (default: 5432)

### Authentication Configuration

```
JWT_SECRET=your_secure_jwt_secret_key_here_change_this_in_production
JWT_EXPIRATION=7d
```

**Generate Secure JWT Secret:**
```bash
openssl rand -base64 32
# Output: AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOp==
```

Or using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Application Configuration

```
NODE_ENV=development          # development, staging, production
PORT=3000                     # API port
```

### Redis Configuration

```
REDIS_URL=redis://localhost:6379
```

**For Remote Redis:**
```
REDIS_URL=redis://[username]:[password]@[host]:[port]
```

### CORS Configuration

```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080
```

**Production Example:**
```
ALLOWED_ORIGINS=https://app.edtech.com,https://admin.edtech.com
```

### Firebase Configuration (Optional)

For Firebase Admin SDK integration:

```
FIREBASE_PROJECT_ID=edtech-learning-app
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

### AWS S3 Configuration (Optional)

For document storage in AWS:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=edtech-documents
```

### Email Configuration (Optional)

For sending notifications:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Logging Configuration

```
LOG_LEVEL=debug              # debug, info, warn, error
```

## Development Setup

1. **Copy the example file:**
```bash
cd backend-api
cp .env.example .env
```

2. **Update with local values:**
```
DATABASE_URL=postgresql://edtech_user:edtech_password_123@localhost:5432/edtech_db
JWT_SECRET=dev_secret_key_not_for_production
JWT_EXPIRATION=7d
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
LOG_LEVEL=debug
```

3. **Start development server:**
```bash
npm run start:dev
```

## Production Setup

### 1. Database

Set up PostgreSQL on production:
```bash
# Using AWS RDS
# Get the endpoint: database-name.xxxxx.region.rds.amazonaws.com

DATABASE_URL=postgresql://edtech_prod:StrongPassword123!@database.xxxxx.rds.amazonaws.com:5432/edtech_prod
```

### 2. Redis

Set up Redis on production:
```bash
# Using AWS ElastiCache
REDIS_URL=redis://:password@cache.xxxxx.cache.amazonaws.com:6379
```

### 3. JWT Secret

Generate a strong JWT secret:
```bash
openssl rand -base64 32
```

Use this value:
```
JWT_SECRET=GeneratedSecureKey==
```

### 4. Complete Production .env

```
# Production Configuration
DATABASE_URL=postgresql://edtech_prod:StrongPassword@prod-db.rds.amazonaws.com:5432/edtech_prod
JWT_SECRET=GeneratedSecureKeyFromOpenSSL==
JWT_EXPIRATION=7d
NODE_ENV=production
PORT=3000
REDIS_URL=redis://:password@cache.xxxxx.cache.amazonaws.com:6379

# CORS - Production domains only
ALLOWED_ORIGINS=https://app.edtech.com,https://api.edtech.com

# AWS S3
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=edtech-documents-prod

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxx

# Logging
LOG_LEVEL=warn

# Firebase (optional)
FIREBASE_PROJECT_ID=edtech-learning-app
FIREBASE_PRIVATE_KEY_ID=xxxxx
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

## Docker Compose Development

The `docker-compose.yml` file sets up local services:

```yaml
# Pre-configured PostgreSQL
postgres:
  environment:
    POSTGRES_USER: edtech_user
    POSTGRES_PASSWORD: edtech_password_123
    POSTGRES_DB: edtech_db
  ports:
    - "5432:5432"

# Pre-configured Redis
redis:
  ports:
    - "6379:6379"
```

Your `.env` should match these values for local development.

## Environment Validation

Check if environment variables are set correctly:

```bash
# Create a test script
cat > check-env.js << 'EOF'
require('dotenv').config();

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NODE_ENV',
  'PORT'
];

let valid = true;
required.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing: ${key}`);
    valid = false;
  } else {
    console.log(`✅ Found: ${key}`);
  }
});

process.exit(valid ? 0 : 1);
EOF

node check-env.js
```

## Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use strong passwords** - Min 16 characters, mix of upper, lower, numbers, special chars
3. **Rotate secrets regularly** - Especially in production
4. **Use different secrets per environment** - Dev, staging, production
5. **Store secrets securely** - Use AWS Secrets Manager, HashiCorp Vault, etc.
6. **Limit CORS origins** - Only allow necessary domains
7. **Use HTTPS in production** - Never send credentials over HTTP

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Ensure PostgreSQL is running. Check `DATABASE_URL` matches actual database.

### Redis Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solution:** Ensure Redis is running. Check `REDIS_URL` is correct.

### JWT Secret Issue
```
Error: secret is required
```
**Solution:** Ensure `JWT_SECRET` is set in `.env` file.

### CORS Origin Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Add your frontend URL to `ALLOWED_ORIGINS` in `.env`.

## Resources

- [Node.js dotenv](https://github.com/motdotla/dotenv)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Redis Connection Strings](https://redis.io/docs/connect/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
