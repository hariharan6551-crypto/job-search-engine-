# 🚀 Enterprise Deployment Playbook: AI Career Engine

This is the definitive, unsimplified, production-grade deployment guide for the **Job AI Platform**. It outlines everything required to transition the codebase into a globally accessible, secure, and scalable cloud environment running on Ubuntu 22.04.

---

## 🌐 1. Server Infrastructure & Hardening

SSH into your freshly provisioned Ubuntu 22.04 VPS.

### A. Core Dependencies Installation
```bash
# Update package registries
sudo apt update && sudo apt upgrade -y

# Install prerequisite packages
sudo apt install -y ca-certificates curl gnupg lsb-release git ufw certbot python3-certbot-nginx nginx

# Install Official Docker Engine
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable Docker to run on boot
sudo systemctl enable docker
sudo systemctl start docker
```

### B. Security Hardening (UFW Firewall)
```bash
# Deny all incoming by default, allow outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Open required production ports
sudo ufw allow ssh       # Port 22
sudo ufw allow http      # Port 80
sudo ufw allow https     # Port 443

# Enable Firewall
sudo ufw enable
sudo ufw status
```

---

## 📦 2. Project Initial Setup

Ensure your custom domain (e.g., `app.yourdomain.com`) has its **A Record** pointing to your new VPS IPv4 Address before proceeding.

```bash
# Navigate to the home directory and clone your repository
cd ~
git clone https://github.com/hariharan6551-crypto/job-search-engine-.git
cd job-search-engine-

# Create the master environment envelope
nano .env
```

### `.env` File Configuration
Populate this and save (`Ctrl+O`, `Enter`, `Ctrl+X`):
```env
# Platform Mode
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://app.yourdomain.com/api

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=ai_career_user
DB_PASSWORD=SecureDbPassw0rd123!
DB_NAME=job_platform_db

# Redis & Elasticsearch
REDIS_HOST=redis
REDIS_PORT=6379
ELASTICSEARCH_HOST=http://elasticsearch:9200

# Backend & JWT
JWT_SECRET=production_secret_key_change_me
BACKEND_PORT=3001

# AI Engine
AI_ENGINE_PORT=8000
```

---

## 🌍 3. Global Reverse Proxy (NGINX)

We will use the system-level NGINX to route traffic natively to the internal Docker network.

```bash
# Create NGINX Configuration
sudo nano /etc/nginx/sites-available/job-platform
```

Paste the following unsimplified robust config. Replace `app.yourdomain.com` with your domain.
```nginx
# Map connection upgrades (for WebSockets/Next.js HMR)
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# Rate limit zone: 10 requests per second per IP
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name app.yourdomain.com;

    # Redirect all HTTP requests to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name app.yourdomain.com;

    # SSL Certificates (Certbot will inject paths here later)
    # ssl_certificate /etc/letsencrypt/live/app.yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/app.yourdomain.com/privkey.pem;

    # Performance: Gzip Compression
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # NestJS Backend API
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;
        proxy_pass http://localhost:3001/; # Maps to Docker backend port
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Python AI Engine
    location /ai/ {
        limit_req zone=mylimit burst=20 nodelay;
        proxy_pass http://localhost:8000/; # Maps to Docker AI port
        
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Extended timeout for heavy AI NLP tasks
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }

    # Next.js Frontend (Catch-all)
    location / {
        proxy_pass http://localhost:3000; # Maps to Docker frontend port
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Cache Control for Static Assets
        location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
            proxy_pass http://localhost:3000;
            expires 30d;
            add_header Cache-Control "public, max-age=2592000, immutable";
            access_log off;
        }
    }
}
```

```bash
# Enable the configuration and test
sudo ln -s /etc/nginx/sites-available/job-platform /etc/nginx/sites-enabled/
sudo nginx -t
```
*Do not restart NGINX yet until SSL is active.*

---

## 🔐 4. SSL (Let's Encrypt) Setup

Certbot will automatically intercept our NGINX config, generate an SSL cert, and inject the paths.

```bash
# Run Certbot (Answer the prompts and provide your email)
sudo certbot --nginx -d app.yourdomain.com

# Verify renewal mechanism is active
sudo systemctl status certbot.timer

# Restart NGINX fully loaded
sudo systemctl restart nginx
```

---

## 🛳 5. The Production Docker-Compose Cluster

Ensure your `docker/docker-compose.yml` matches exactly the version already configured in the repo (with JSON logs, restricted memory bounds, and health checks).

---

## ⚡ 6. Final Deployment Execution

Once all the above is set up inside your VPS:

```bash
# Make sure you are in the project root
cd ~/job-search-engine-

# Optional: Prune any old cache
docker system prune -f

# 🚀 Execute the entire production build process
docker compose -f docker/docker-compose.yml up --build -d
```

### 🚦 Monitoring the Live System
```bash
# Check if all containers successfully passed health checks
docker ps

# Monitor real-time logs for the AI Engine
docker logs -f ai_engine_core

# Monitor real-time logs for the Node Backend
docker logs -f ai_backend

# Monitor NGINX Access/Error Logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
