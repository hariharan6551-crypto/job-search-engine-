# 🚀 Job AI Platform

> An AI-powered job search platform that aggregates jobs, analyzes resumes, and recommends the best career opportunities using machine learning.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![Python](https://img.shields.io/badge/python-%3E%3D3.10-blue.svg)

---

## 🏗 Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend   │────▶│   Backend   │────▶│  AI Engine  │
│   Next.js    │     │   NestJS    │     │   FastAPI   │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  PostgreSQL  │
                    │ Elasticsearch│
                    └─────────────┘
```

## ✨ Features

- **🔍 Smart Job Search** — Elasticsearch-powered search with filters for location, salary, skills
- **📄 AI Resume Parser** — Extract skills, experience, and education using NLP
- **🎯 Job Matching Engine** — Embedding-based similarity scoring for personalized recommendations
- **🌍 Location Intelligence** — Geo-filtering with priority for Tamil Nadu, Coimbatore, Bangalore, Kerala
- **🕷 Job Aggregation** — Automated scraping from Indeed, LinkedIn, Naukri
- **📊 Analytics Dashboard** — Career insights and recommendation analytics
- **🔐 Secure Auth** — JWT-based authentication with role management

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, ShadCN UI, Zustand, Framer Motion |
| Backend | NestJS, TypeScript, TypeORM |
| AI Engine | FastAPI, Sentence Transformers, spaCy, scikit-learn |
| Database | PostgreSQL, Elasticsearch |
| Scraper | Playwright, node-cron |
| DevOps | Docker, Docker Compose |

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/hariharan6551-crypto/job-search-engine-.git
cd job-search-engine-

# Install all dependencies
npm run install:all

# Setup database
npm run db:migrate
npm run db:seed

# Start all services
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:3001
npm run dev:ai         # http://localhost:8000
```

### Docker Setup

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down
```

## 📁 Project Structure

```
job-ai-platform/
├── frontend/          # Next.js + Tailwind + ShadCN UI
├── backend/           # NestJS API server
├── ai-engine/         # FastAPI ML microservice
├── database/          # PostgreSQL schemas & migrations
├── scraper/           # Job scraping modules
├── shared/            # Shared types & constants
├── docker/            # Docker configuration
├── .env               # Environment variables
└── package.json       # Monorepo root config
```

## 🔌 API Endpoints

### Backend (NestJS)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/jobs` | List jobs with filters |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/resume/upload` | Upload resume |
| GET | `/api/recommendations` | AI recommendations |

### AI Engine (FastAPI)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/parse-resume` | Extract resume data |
| POST | `/match-jobs` | Match resume to jobs |
| GET | `/health` | Health check |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
