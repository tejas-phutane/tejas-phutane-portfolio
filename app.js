// App State
const AppState = {
    currentPage: 'home',
    projects: {
        'multi-stream-analytics': {
            id: 'multi-stream-analytics',
            name: 'Multi-Stream Video Analytics Platform',
            short_desc: 'Real-time video processing system achieving 99%+ detection accuracy',
            status: 'Production Deployed',
            overview: 'A production-grade video analytics platform designed for dairy logistics optimization. The system processes multiple concurrent RTSP video streams in real-time, performing object detection and classification with high accuracy across varying environmental conditions.',
            challenge: 'The client required real-time inventory tracking across 4 processing lines. Manual counting was error-prone and labor-intensive. The system needed to process multiple high-resolution video streams simultaneously while maintaining sub-50ms latency per frame and achieving accuracy above 99%.',
            solution: 'Architected a GPU-accelerated multi-stream pipeline using NVIDIA DeepStream SDK. Implemented custom YOLOv5 object detection model trained on 8000+ annotated images specific to the use case. Optimized inference using TensorRT, achieving 50% latency reduction.',
            tech_stack: ['YOLOv5', 'NVIDIA DeepStream', 'TensorRT', 'Apache Kafka', 'TimescaleDB', 'Python', 'C++', 'Docker'],
            results: {
                'Accuracy': '99.2%',
                'Latency': '42ms avg',
                'Throughput': '4 streams',
                'Uptime': '99.8%'
            }
        },
        'valve-qc-system': {
            id: 'valve-qc-system',
            name: 'Valve Guide Vision QC System',
            short_desc: 'Automated defect detection for precision manufacturing',
            status: '85% Complete',
            overview: 'An automated visual inspection system for precision valve guide manufacturing. The system performs defect detection at micron-level precision, integrating with existing PLC-controlled production lines for real-time quality control.',
            challenge: 'Manufacturing client needed automated inspection for valve guides with ±100 micron tolerance. Manual inspection was inconsistent and slow. The system required integration with existing PLC-controlled production line and sub-100ms decision time to maintain line speed.',
            solution: 'Designed complete vision system with high-resolution line-scan cameras and precision optics. Developed custom CNN based on ResNet50 architecture, trained on 5000+ defect samples. Implemented edge inference on NVIDIA Jetson Xavier for real-time processing.',
            tech_stack: ['Custom CNN', 'ResNet50', 'NVIDIA Triton', 'Hikvision Cameras', 'PLC Integration', 'Jetson Xavier', 'Docker', 'MLflow'],
            results: {
                'Accuracy': '96.3%',
                'Speed': '3 sec/part',
                'Precision': '50 micron',
                'False Positive': '<2%'
            }
        },
        'robot-analytics': {
            id: 'robot-analytics',
            name: 'Robot-Vision Analytics Framework',
            short_desc: 'Performance monitoring and predictive analytics system',
            status: 'Production Deployed',
            overview: 'A comprehensive analytics framework for monitoring and optimizing robotic system performance. Provides real-time operational insights and predictive modeling for throughput optimization.',
            challenge: 'Deployed robotic systems lacked performance visibility. No way to identify bottlenecks or predict throughput, limiting optimization potential and client ROI demonstration.',
            solution: 'Built comprehensive analytics framework logging all robot operations and vision detections to PostgreSQL. Developed regression models predicting throughput based on waste characteristics with 91% accuracy.',
            tech_stack: ['PostgreSQL', 'pandas', 'scikit-learn', 'Plotly', 'Python', 'Jupyter'],
            results: {
                'Prediction Accuracy': '91%',
                'Operations Logged': '10,000+/day',
                'Dashboard': 'Real-time',
                'Optimizations': '3 identified'
            }
        },
        'autonomous-navigation': {
            id: 'autonomous-navigation',
            name: 'Autonomous Navigation System',
            short_desc: 'Multi-sensor fusion for mobile robot localization',
            status: 'Completed',
            overview: 'Complete autonomous navigation stack for mobile robots in dynamic warehouse environments, featuring multi-sensor fusion and real-time path planning capabilities.',
            challenge: 'Develop robust navigation stack for mobile robots in dynamic warehouse environments with varying lighting and obstacles. Required sub-0.5m localization accuracy and real-time obstacle avoidance.',
            solution: 'Designed complete ROS-based perception stack with multi-sensor fusion (Camera, 3D Lidar, GPS, IMU). Implemented Kalman filtering for robust state estimation. Developed dynamic path planning with behavior tree logic.',
            tech_stack: ['ROS2', 'MoveIt', 'Gazebo', 'Kalman Filtering', 'Python', 'C++'],
            results: {
                'Localization': '0.45m accuracy',
                'Success Rate': '99.2%',
                'Planning': 'Real-time',
                'Simulation': 'Gazebo validated'
            }
        },
        'warehouse-automation': {
            id: 'warehouse-automation',
            name: 'Warehouse Automation System',
            short_desc: 'Multi-robot coordination for package delivery',
            status: 'Competition Project',
            overview: 'Multi-robot warehouse coordination system enabling autonomous package delivery with collision-free operation and real-time logistics tracking.',
            challenge: 'Develop autonomous warehouse system with multiple robots coordinating package delivery without collisions. Required real-time inter-robot communication and motion planning.',
            solution: 'Implemented dual UR5 robot system using MoveIt motion planning framework. Developed MQTT-based coordination protocol for collision-free operation.',
            tech_stack: ['ROS', 'MoveIt', 'MQTT', 'Python', 'Gazebo'],
            results: {
                'Collisions': 'Zero events',
                'Execution': 'Parallel tasks',
                'Tracking': 'Real-time',
                'Robots': '2 coordinated'
            }
        }
    }
};

// Router
function navigateTo(page) {
    AppState.currentPage = page;
    updateNav();
    renderPage(page);
    window.scrollTo(0, 0);
}

function updateNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === AppState.currentPage) {
            item.classList.add('active');
        }
    });
}

function renderPage(page) {
    const app = document.getElementById('app');
    
    const pageMap = {
        'home': renderHomePage,
        'about': renderAboutPage,
        'experience': renderExperiencePage,
        'projects': renderProjectsPage,
        'contact': renderContactPage
    };

    // Check if it's a project detail page
    if (page.startsWith('project-')) {
        const projectId = page.replace('project-', '');
        app.innerHTML = renderProjectDetailPage(projectId);
    } else if (pageMap[page]) {
        app.innerHTML = pageMap[page]();
    } else {
        app.innerHTML = renderHomePage();
    }

    // No animations for minimal design
}

// Page Renderers
function renderHomePage() {
    return `
        <div class="page">
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Tejas Phutane</h1>
                    <p class="hero-subtitle">Senior Robotics &amp; Computer Vision Engineer</p>
                    <p class="hero-tagline">Building intelligent systems with ROS2, Computer Vision, and Deep Learning</p>
                    <p class="hero-tagline" style="font-size: var(--text-base); margin-bottom: 2rem;">Vadodara, India</p>
                    <div class="cta-buttons">
                        <a href="#projects" class="btn btn-primary" onclick="navigateTo('projects'); return false;">
                            View Projects →
                        </a>
                        <a href="#contact" class="btn btn-secondary" onclick="navigateTo('contact'); return false;">
                            Contact
                        </a>
                    </div>
                </div>
            </section>

            <!-- Brief Introduction -->
            <section class="split-section">
                <div class="split-content">
                    <p class="split-text">Robotics engineer with 3+ years of experience architecting production-grade computer vision and autonomous systems. Specialized in real-time perception pipelines, motion planning, and edge AI deployment. Proven track record of delivering systems with 99%+ accuracy in industrial automation environments.</p>
                    
                    <h3 class="split-title" style="font-size: var(--text-xl); margin-top: 2rem;">Current Focus</h3>
                    <ul class="principle-list">
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Multi-stream video analytics with DeepStream and TensorRT optimization</p>
                            </div>
                        </li>
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Autonomous navigation and motion planning with ROS2 ecosystem</p>
                            </div>
                        </li>
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Edge AI deployment on NVIDIA Jetson platforms for real-time inference</p>
                            </div>
                        </li>
                    </ul>
                    
                    <div class="floating-stats" style="justify-content: flex-start; margin-top: 3rem;">
                        <div class="stat-item">
                            <div class="stat-number">3+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">5</div>
                            <div class="stat-label">Production Systems</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">99%+</div>
                            <div class="stat-label">Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    `;
}

function renderTechCard(name) {
    return `
        <div class="tech-card">
            <div class="tech-name">${name}</div>
        </div>
    `;
}

function renderAboutPage() {
    return `
        <div class="page">
            <!-- About Section -->
            <section class="split-section">
                <div class="split-content">
                    <h1 class="section-title">About</h1>
                    <div class="placeholder-image" style="margin: 2rem 0;">Professional Photo</div>
                    
                    <h2 class="split-title">Tejas Phutane</h2>
                    <p class="hero-subtitle" style="text-align: left; margin-bottom: 2rem;">Senior Robotics &amp; Computer Vision Engineer</p>
                    
                    <p class="split-text">Robotics engineer with 3+ years of experience architecting production-grade computer vision and autonomous systems. Specialized in real-time perception pipelines, motion planning, and edge AI deployment.</p>
                    
                    <p class="split-text">Started my journey as a computer vision intern, working on autonomous navigation systems with YOLO detection and OpenCV. Progressed to junior robotics engineer, where I designed complete ROS-based navigation stacks and reduced development cycles by 60% through simulation.</p>
                    
                    <p class="split-text">Currently serving as senior robotics engineer, leading production deployments of intelligent systems achieving 99%+ accuracy across multiple industrial automation environments. Proven track record in multi-stream video analytics, motion control optimization, and edge AI deployment.</p>
                </div>
            </section>

            <!-- Education -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Education</h2>
                    <p class="split-text"><strong>B.E. Electronics &amp; Telecommunication Engineering</strong><br>
                    MCT's Rajiv Gandhi Institute of Technology, Mumbai<br>
                    2017-2021</p>
                </div>
            </section>
            
            <!-- Certifications -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Certifications</h2>
                    <ul class="principle-list">
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Introduction to Robotics (NPTEL)</p>
                            </div>
                        </li>
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Robotics Specialization (Coursera)</p>
                            </div>
                        </li>
                        <li class="principle-item">
                            <div class="principle-content">
                                <p>Control of Mobile Robots (Coursera)</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            
            <!-- Publications -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Publications</h2>
                    <p class="split-text"><strong>"A Stateflow-based Approach for Simulation of Line Following Maze Solver Robot"</strong><br>
                    International Journal of Research in Applied Science &amp; Engineering Technology<br>
                    DOI: 10.22214/ijraset.2021.33883</p>
                </div>
            </section>

            <!-- Skills -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Skills &amp; Expertise</h2>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Robotics &amp; Automation</h3>
                    <div class="tech-grid">
                        ${renderTechCard('ROS/ROS2')}
                        ${renderTechCard('Gazebo')}
                        ${renderTechCard('Isaac Sim')}
                        ${renderTechCard('Motion Planning')}
                        ${renderTechCard('MoveIt')}
                        ${renderTechCard('Sensor Fusion')}
                    </div>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Computer Vision &amp; AI</h3>
                    <div class="tech-grid">
                        ${renderTechCard('YOLO (v5, v8, v11)')}
                        ${renderTechCard('OpenCV')}
                        ${renderTechCard('Deep Learning')}
                        ${renderTechCard('TensorRT')}
                        ${renderTechCard('DeepStream')}
                        ${renderTechCard('Object Detection')}
                    </div>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Programming</h3>
                    <div class="tech-grid">
                        ${renderTechCard('Python (Expert)')}
                        ${renderTechCard('C++ (Proficient)')}
                        ${renderTechCard('MATLAB')}
                        ${renderTechCard('Linux/UNIX')}
                    </div>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Deployment &amp; Infrastructure</h3>
                    <div class="tech-grid">
                        ${renderTechCard('Docker')}
                        ${renderTechCard('Kubernetes')}
                        ${renderTechCard('CUDA')}
                        ${renderTechCard('Kafka')}
                        ${renderTechCard('MQTT')}
                        ${renderTechCard('PostgreSQL')}
                        ${renderTechCard('TimescaleDB')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderExperiencePage() {
    return `
        <div class="page">
            <!-- Experience Section -->
            <section class="split-section">
                <div class="split-content">
                    <h1 class="section-title">Experience</h1>
                </div>
            </section>

            <section class="timeline-section">
                <div class="section-container">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <div class="timeline-company">Wastefull Insights</div>
                                <h3 class="timeline-title">Senior Robotics Engineer</h3>
                                <div class="timeline-year">Aug 2022 - Dec 2025 | Vadodara, India</div>
                                <p class="timeline-description" style="margin: 1rem 0;">Led software architecture and perception pipeline development for autonomous robotic waste management systems.</p>
                                <p class="split-text" style="margin-bottom: 0.5rem;"><strong>Key Achievements:</strong></p>
                                <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-gray);">
                                    <li style="margin-bottom: 0.5rem;">Architected multi-stream video analytics platform processing 4 concurrent feeds with 99%+ accuracy</li>
                                    <li style="margin-bottom: 0.5rem;">Reduced computational overhead by 80% through C++ optimization and algorithm refinement</li>
                                    <li style="margin-bottom: 0.5rem;">Designed motion control algorithms improving system speed by 40%</li>
                                    <li style="margin-bottom: 0.5rem;">Built analytics framework with 91% throughput prediction accuracy</li>
                                    <li>Led production deployment including hardware commissioning and PLC integration</li>
                                </ul>
                                <p class="split-text" style="margin-top: 1rem;"><strong>Technologies:</strong> Python, C++, ROS2, OpenCV, YOLO, DeepStream, TensorRT, Triton, Gazebo, Kafka, PostgreSQL, Docker</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <div class="timeline-company">Engineering Services International</div>
                                <h3 class="timeline-title">Junior Robotics Engineer</h3>
                                <div class="timeline-year">Oct 2021 - Jul 2022 | Ahmedabad, India</div>
                                <p class="timeline-description" style="margin: 1rem 0;">Developed robotic systems and perception algorithms for autonomous mobile platforms.</p>
                                <p class="split-text" style="margin-bottom: 0.5rem;"><strong>Key Achievements:</strong></p>
                                <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-gray);">
                                    <li style="margin-bottom: 0.5rem;">Designed complete perception and navigation stacks using ROS ecosystem</li>
                                    <li style="margin-bottom: 0.5rem;">Reduced development cycles by 60% through Gazebo simulation</li>
                                    <li style="margin-bottom: 0.5rem;">Achieved 0.5m localization accuracy with multi-sensor fusion</li>
                                    <li>Built object detection pipelines using YOLO on Jetson Nano</li>
                                </ul>
                                <p class="split-text" style="margin-top: 1rem;"><strong>Technologies:</strong> ROS, C++, Python, Gazebo, OpenCV, MoveIt, MQTT, Arduino</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <div class="timeline-company">IN2PETA Services</div>
                                <h3 class="timeline-title">Computer Vision Intern</h3>
                                <div class="timeline-year">Jun 2021 - Oct 2021 | Hyderabad, India</div>
                                <p class="timeline-description" style="margin: 1rem 0;">Contributed to perception and vision system development for autonomous robotics.</p>
                                <p class="split-text" style="margin-bottom: 0.5rem;"><strong>Key Achievements:</strong></p>
                                <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-gray);">
                                    <li style="margin-bottom: 0.5rem;">Implemented autonomous robot navigation with YOLO-based detection</li>
                                    <li>Built real-time computer vision solutions using OpenCV</li>
                                </ul>
                                <p class="split-text" style="margin-top: 1rem;"><strong>Technologies:</strong> ROS, Python, OpenCV, YOLO, Jetson</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    `;
}

function renderProjectsPage() {
    return `
        <div class="page">
            <!-- Projects Section -->
            <section class="split-section">
                <div class="split-content">
                    <h1 class="section-title">Projects</h1>
                </div>
            </section>

            <section class="timeline-section">
                <div class="section-container">
                    <div class="projects-grid">
                        ${renderProjectCard('multi-stream-analytics')}
                        ${renderProjectCard('valve-qc-system')}
                        ${renderProjectCard('robot-analytics')}
                        ${renderProjectCard('autonomous-navigation')}
                        ${renderProjectCard('warehouse-automation')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderProjectCard(projectId) {
    const project = AppState.projects[projectId];
    return `
        <div class="project-card" onclick="navigateTo('project-${projectId}')">
            <div class="placeholder-image">${project.name}</div>
            <div class="project-status">Status: ${project.status}</div>
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-tagline">${project.short_desc}</p>
                <a href="#project-${projectId}" class="btn btn-secondary" style="margin-top: 1rem; display: inline-block;" onclick="navigateTo('project-${projectId}'); return false;">View Details →</a>
            </div>
        </div>
    `;
}

function renderProjectDetailPage(projectId) {
    const project = AppState.projects[projectId];
    if (!project) return renderProjectsPage();

    return `
        <div class="page">
            <!-- Project Header -->
            <section class="project-hero">
                <div class="project-hero-content">
                    <a href="#projects" class="back-link" onclick="navigateTo('projects'); return false;">
                        ← Previous Project
                    </a>
                    <h1 class="section-title" style="margin: 1.5rem 0;">${project.name}</h1>
                    <div class="placeholder-image" style="margin: 2rem 0;">${project.name} - Hero Image</div>
                </div>
            </section>
            
            <!-- Overview -->
            <section class="split-section">
                <div class="split-content">
                    <h2 class="split-title">Overview</h2>
                    <p class="split-text">${project.overview}</p>
                </div>
            </section>

            <!-- Challenge -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Challenge</h2>
                    <p class="split-text">${project.challenge}</p>
                </div>
            </section>
            
            <!-- Solution -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Solution</h2>
                    <p class="split-text">${project.solution}</p>
                </div>
            </section>

            <!-- Technical Details -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Technical Details</h2>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Architecture</h3>
                    <div class="placeholder-image" style="margin: 1rem 0;">System Architecture Diagram</div>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Technology Stack</h3>
                    <div class="tech-grid">
                        ${project.tech_stack.map(tech => renderTechCard(tech)).join('')}
                    </div>
                    
                    <div class="placeholder-image" style="margin: 2rem 0;">System Screenshots</div>
                </div>
            </section>
            
            <!-- Results -->
            <section class="timeline-section">
                <div class="section-container">
                    <h2 class="section-title">Results</h2>
                    <div class="placeholder-image" style="margin: 2rem 0;">Results Visualization</div>
                    
                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 2rem;">Key Metrics</h3>
                    <div class="impact-grid">
                        ${Object.entries(project.results).map(([key, value]) => `
                            <div class="impact-card">
                                <div class="impact-label">${key}</div>
                                <div class="impact-value">${value}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Navigation -->
            <section class="timeline-section">
                <div class="section-container">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <a href="#projects" class="back-link" onclick="navigateTo('projects'); return false;">
                            ← Back to Projects
                        </a>
                        <a href="#projects" class="back-link" onclick="navigateTo('projects'); return false;">
                            Next Project →
                        </a>
                    </div>
                </div>
            </section>
        </div>
    `;
}



function renderContactPage() {
    return `
        <div class="page">
            <!-- Contact Section -->
            <section class="contact-split">
                <div class="contact-form-container">
                    <h1 class="contact-title">Contact</h1>
                    <p class="contact-subtitle">Let's work together</p>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-details">
                                <strong>Email</strong><br>
                                <a href="mailto:tejasphutane.work@gmail.com">tejasphutane.work@gmail.com</a>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-details">
                                <strong>Phone</strong><br>
                                <a href="tel:+918484016205">+91-8484016205</a>
                            </div>
                        </div>
                    </div>

                    <form class="contact-form" onsubmit="handleFormSubmit(event)">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required placeholder="Your name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="your.email@example.com">
                        </div>
                        <div class="form-group">
                            <label for="projectType">Project Type</label>
                            <select id="projectType" name="projectType" required>
                                <option value="">Select project type</option>
                                <option value="computer-vision">Computer Vision</option>
                                <option value="robotics">Robotics & Automation</option>
                                <option value="ai-ml">AI/ML Deployment</option>
                                <option value="consulting">Consulting</option>
                                <option value="full-time">Full-Time Opportunity</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" required placeholder="Tell me about your project..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message →</button>
                    </form>

                    <h3 class="split-title" style="font-size: var(--text-lg); margin-top: 3rem;">Connect</h3>
                    <div class="social-links">
                        <a href="https://linkedin.com/in/tejas-phutane" target="_blank" class="social-link">LinkedIn</a>
                        <a href="https://github.com/TejasPhutane" target="_blank" class="social-link">GitHub</a>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="footer">
                <p class="copyright">© 2025 Tejas Phutane</p>
            </footer>
        </div>
    `;
}

// Event Handlers
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(`Thank you! I'll get back to you soon.\n\nName: ${formData.get('name')}\nEmail: ${formData.get('email')}`);
    event.target.reset();
}

// Custom Cursor - Disabled for minimal design
function initCursor() {
    // Disabled for minimal design
}

// Hash Navigation
function handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.floating-nav');
    
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Initialize App
function init() {
    // Set up navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            window.location.hash = page;
        });
    });
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial render
    handleHashChange();
    
    // Cursor disabled for minimal design
    
    // Mobile menu
    initMobileMenu();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}