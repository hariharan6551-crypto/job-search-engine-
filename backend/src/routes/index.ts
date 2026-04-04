// Route definitions are handled by NestJS module controllers
// This file documents the API route structure

/**
 * API Routes:
 *
 * Auth:
 *   POST /api/auth/register     - Register new user
 *   POST /api/auth/login         - Login user
 *   GET  /api/auth/profile       - Get current user profile
 *
 * Jobs:
 *   GET  /api/jobs               - List all jobs (with filters)
 *   GET  /api/jobs/search        - Search jobs
 *   GET  /api/jobs/:id           - Get job by ID
 *   POST /api/jobs               - Create job (admin)
 *
 * Resume:
 *   POST /api/resume/upload      - Upload resume
 *   GET  /api/resume/:id/analysis - Get resume analysis
 *
 * Recommendations:
 *   GET  /api/recommendations    - Get AI recommendations
 *   GET  /api/recommendations/trending - Get trending skills
 *
 * Users:
 *   GET  /api/users/:id          - Get user by ID
 *   PUT  /api/users/:id          - Update user
 *
 * Location:
 *   GET  /api/location/nearby-jobs - Geo-based job search
 *   GET  /api/location/cities     - Supported cities
 *
 * Scraper:
 *   POST /api/scraper/trigger    - Trigger scraping
 *   GET  /api/scraper/status     - Get scraper status
 */

export {};
