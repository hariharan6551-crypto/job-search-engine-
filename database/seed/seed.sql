-- ============================================
-- Job AI Platform — Seed Data
-- ============================================

-- ===== Insert Skills =====
INSERT INTO skills (name, category, demand_score, trending) VALUES
('React', 'framework', 95, TRUE),
('TypeScript', 'language', 92, TRUE),
('Python', 'language', 98, TRUE),
('Node.js', 'framework', 90, TRUE),
('PostgreSQL', 'database', 85, FALSE),
('Docker', 'tool', 88, TRUE),
('AWS', 'cloud', 93, TRUE),
('Kubernetes', 'cloud', 82, TRUE),
('TensorFlow', 'framework', 78, FALSE),
('Next.js', 'framework', 86, TRUE),
('Go', 'language', 75, TRUE),
('MongoDB', 'database', 72, FALSE),
('Redis', 'database', 70, FALSE),
('GraphQL', 'framework', 68, FALSE),
('Terraform', 'tool', 80, TRUE),
('Java', 'language', 88, FALSE),
('SQL', 'language', 90, FALSE),
('Git', 'tool', 95, FALSE),
('Figma', 'tool', 75, FALSE),
('FastAPI', 'framework', 72, TRUE)
ON CONFLICT (name) DO NOTHING;

-- ===== Insert Demo Jobs =====
INSERT INTO jobs (title, company, location, salary_min, salary_max, type, skills, description, source, latitude, longitude) VALUES
('Senior Full-Stack Engineer', 'TechCorp India', 'Bangalore, Karnataka', 1800000, 2800000, 'Full-time',
 ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
 'We are looking for a Senior Full-Stack Engineer to build scalable web applications using React and Node.js. You will work on our core platform serving millions of users.',
 'direct', 12.9716, 77.5946),

('AI/ML Engineer', 'DataVerse AI', 'Coimbatore, Tamil Nadu', 1500000, 2500000, 'Full-time',
 ARRAY['Python', 'TensorFlow', 'NLP', 'FastAPI'],
 'Join our AI team to build cutting-edge NLP models for our job matching engine. Work with state-of-the-art transformer models and embedding techniques.',
 'direct', 11.0168, 76.9558),

('DevOps Cloud Architect', 'CloudNine Solutions', 'Chennai, Tamil Nadu', 2000000, 3500000, 'Remote',
 ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform'],
 'Architect and manage cloud infrastructure for our growing platform. Lead migrations and implement CI/CD pipelines.',
 'direct', 13.0827, 80.2707),

('Product Designer', 'DesignFlow Studio', 'Kochi, Kerala', 1200000, 2000000, 'Hybrid',
 ARRAY['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
 'Design beautiful, intuitive interfaces for our suite of products. Collaborate closely with engineering and product teams.',
 'direct', 9.9312, 76.2673),

('Backend Engineer (Go)', 'FinEdge Technologies', 'Bangalore, Karnataka', 1600000, 3000000, 'Full-time',
 ARRAY['Go', 'gRPC', 'Redis', 'Microservices'],
 'Build high-performance backend services for our fintech platform processing thousands of transactions per second.',
 'direct', 12.9716, 77.5946),

('Data Analyst', 'InsightPro Analytics', 'Coimbatore, Tamil Nadu', 800000, 1400000, 'Full-time',
 ARRAY['SQL', 'Python', 'Tableau', 'Excel'],
 'Analyze business data to drive strategic decisions. Create dashboards and reports for leadership.',
 'direct', 11.0168, 76.9558),

('React Native Developer', 'AppForge Mobile', 'Kochi, Kerala', 1000000, 1800000, 'Full-time',
 ARRAY['React', 'JavaScript', 'Redux', 'Firebase'],
 'Build cross-platform mobile applications for our growing user base.',
 'direct', 9.9312, 76.2673),

('Python Developer', 'PyWorks Studio', 'Chennai, Tamil Nadu', 1200000, 2200000, 'Full-time',
 ARRAY['Python', 'Django', 'PostgreSQL', 'Redis'],
 'Develop and maintain Python-based web applications and APIs.',
 'direct', 13.0827, 80.2707),

('Frontend Engineer', 'DesignFlow Labs', 'Bangalore, Karnataka', 1400000, 2400000, 'Full-time',
 ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind'],
 'Build pixel-perfect, responsive user interfaces with modern React and TypeScript.',
 'direct', 12.9716, 77.5946),

('Site Reliability Engineer', 'ScaleOps Infra', 'Hyderabad, Telangana', 1800000, 3200000, 'Remote',
 ARRAY['Linux', 'Kubernetes', 'Terraform', 'Python'],
 'Ensure 99.99% uptime for our global platform. Implement monitoring, alerting, and incident response.',
 'direct', 17.385, 78.4867)
ON CONFLICT DO NOTHING;
