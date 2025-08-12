// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    
    // Close menu when clicking on a nav link
    const navLinkItems = document.querySelectorAll(".nav-links a");
    navLinkItems.forEach(link => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // Load blog posts on homepage
  if (document.getElementById("blog-posts")) {
    loadBlogPosts();
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll effect to header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });
});

// Load blog posts from JSON
async function loadBlogPosts() {
  try {
    console.log("Attempting to load blog posts...");
    const response = await fetch("blog.json");
    console.log("Fetch response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Blog data loaded:", data);

    const blogContainer = document.getElementById("blog-posts");

    if (!blogContainer) {
      console.error("Blog container not found");
      return;
    }

    // Clear existing content
    blogContainer.innerHTML = "";

    // Create blog post elements
    data.posts.forEach((post) => {
      const blogPost = createBlogPostElement(post);
      blogContainer.appendChild(blogPost);
    });

    // Add animation to blog posts
    animateBlogPosts();
    console.log("Blog posts loaded successfully");
  } catch (error) {
    console.error("Error loading blog posts:", error);
    const blogContainer = document.getElementById("blog-posts");
    if (blogContainer) {
      // If fetch fails (likely due to CORS), load fallback content
      loadFallbackBlogPosts(blogContainer);
    }
  }
}

// Fallback blog posts when JSON can't be loaded
function loadFallbackBlogPosts(container) {
  console.log("Loading fallback blog posts...");
  const fallbackPosts = [
    {
      id: 1,
      title: "JussUnique Freestyle",
      description: "",
      youtube_link: "https://www.youtube.com/watch?v=dJT69oK8vnQ",
      image: "./1.png",
    },
    {
      id: 2,
      title: "Choppin it Up with Shellie",
      description:
        "Ju Dizel Music Artist talks about his move to Denver collaborations and New music",
      youtube_link: "https://www.youtube.com/watch?v=W2PBZRoqjPQ",
      image: "./2.png",
    },
  ];

  container.innerHTML = "";

  fallbackPosts.forEach((post) => {
    const blogPost = createBlogPostElement(post);
    container.appendChild(blogPost);
  });

  animateBlogPosts();
}

// Create a blog post element
function createBlogPostElement(post) {
  const article = document.createElement("article");
  article.className = "blog-post";

  // Check if image exists and is not empty
  const hasImage = post.image && post.image.trim() !== "";

  const imageHTML = hasImage
    ? `<img src="${post.image}" alt="${post.title}" class="blog-image" loading="lazy">`
    : `<div class="blog-image-placeholder" aria-label="${post.title}"></div>`;

  article.innerHTML = `
        ${imageHTML}
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-description">${post.description}</p>
            <a href="${post.youtube_link}" target="_blank" rel="noopener noreferrer" class="youtube-link">
                <div class="youtube-icon">📺</div>
                <span class="youtube-text">Watch on YouTube</span>
                <div class="youtube-arrow">→</div>
            </a>
        </div>
    `;

  return article;
}

// Animate blog posts on load
function animateBlogPosts() {
  const blogPosts = document.querySelectorAll(".blog-post");

  // Set initial state
  blogPosts.forEach((post) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(30px)";
  });

  // Animate posts with stagger effect
  blogPosts.forEach((post, index) => {
    setTimeout(() => {
      post.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".blog-post, .link-card, .hero-content, .acronym-panel"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Acronym animation
  animateAcronym();
});

// Acronym animation
function animateAcronym() {
  const acronymLetters = document.querySelectorAll(".acronym-letter");

  if (acronymLetters.length === 0) return;

  // Set initial state
  acronymLetters.forEach((letter) => {
    letter.style.opacity = "0";
    letter.style.transform = "translateY(30px) scale(0.8)";
  });

  // Animate letters with stagger effect
  acronymLetters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      letter.style.opacity = "1";
      letter.style.transform = "translateY(0) scale(1)";
    }, index * 150);
  });

  // Add hover sound effect simulation
  acronymLetters.forEach((letter) => {
    letter.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });

    letter.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Image+Not+Found";
    });
  });
});
