// Dashboard Navigation System
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const currentSectionSpan = document.getElementById('current-section');

// Handle navigation clicks
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = item.getAttribute('href').substring(1);
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update active section
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update breadcrumb
            const sectionName = item.querySelector('span:not(.nav-icon)').textContent;
            currentSectionSpan.textContent = sectionName;
            
            // Scroll to top of content area
            document.querySelector('.dashboard-content').scrollTop = 0;
        }
    });
});

// Real-time clock
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

updateTime();
setInterval(updateTime, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for section navigation
        if (href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && targetSection.classList.contains('section')) {
                e.preventDefault();
                
                // Find the corresponding nav item and trigger click
                const correspondingNav = document.querySelector(`.nav-item[href="${href}"]`);
                if (correspondingNav) {
                    correspondingNav.click();
                }
            }
        }
    });
});

// Parallax effect for background orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.bg-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Animate skill bars when skills section is active
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                fill.style.animation = 'fillBar 1.5s ease-out forwards';
            });
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Mobile menu toggle (for responsive design)
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !e.target.closest('#menu-toggle')) {
            sidebar.classList.remove('mobile-open');
        }
    }
});

// Panel hover effects - enhanced glow
const panels = document.querySelectorAll('.panel');
panels.forEach(panel => {
    panel.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    panel.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add typing effect to hero title on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// Console easter egg
console.log('%c⚡ SYSTEM INITIALIZED ⚡', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Micah Broussard\'s Portfolio Dashboard', 'color: #00d4ff; font-size: 14px;');
console.log('%cIf you\'re reading this, you should probably hire me! 😄', 'color: #ff00ff; font-size: 12px;');