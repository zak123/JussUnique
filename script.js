// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Load blog posts on homepage
    if (document.getElementById('blog-posts')) {
        loadBlogPosts();
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
});

// Load blog posts from JSON
async function loadBlogPosts() {
    try {
        const response = await fetch('blog.json');
        if (!response.ok) {
            throw new Error('Failed to load blog posts');
        }
        
        const data = await response.json();
        const blogContainer = document.getElementById('blog-posts');
        
        if (!blogContainer) {
            console.error('Blog container not found');
            return;
        }

        // Clear existing content
        blogContainer.innerHTML = '';

        // Create blog post elements
        data.posts.forEach(post => {
            const blogPost = createBlogPostElement(post);
            blogContainer.appendChild(blogPost);
        });

        // Add animation to blog posts
        animateBlogPosts();

    } catch (error) {
        console.error('Error loading blog posts:', error);
        const blogContainer = document.getElementById('blog-posts');
        if (blogContainer) {
            blogContainer.innerHTML = '<p style="text-align: center; color: #ff6b35;">Unable to load blog posts. Please try again later.</p>';
        }
    }
}

// Create a blog post element
function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-image" loading="lazy">
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-description">${post.description}</p>
            <iframe 
                src="${post.youtube_embed}" 
                class="blog-video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
    `;
    
    return article;
}

// Animate blog posts on load
function animateBlogPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Set initial state
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
    });

    // Animate posts with stagger effect
    blogPosts.forEach((post, index) => {
        setTimeout(() => {
            post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.blog-post, .link-card, .hero-content, .acronym-panel');
    animatedElements.forEach(el => observer.observe(el));

    // Acronym animation
    animateAcronym();
});

// Acronym animation
function animateAcronym() {
    const acronymLetters = document.querySelectorAll('.acronym-letter');
    
    if (acronymLetters.length === 0) return;

    // Set initial state
    acronymLetters.forEach((letter, index) => {
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(30px) scale(0.8)';
    });

    // Animate letters with stagger effect
    acronymLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });

    // Add hover sound effect simulation
    acronymLetters.forEach(letter => {
        letter.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        letter.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Image+Not+Found';
        });
    });
});